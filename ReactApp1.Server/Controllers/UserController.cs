using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using ReactApp1.Server.Data;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.Account;
using ReactApp1.Server.Models.Dto;
using System.Text;
using System.Text.Json;
using System.Web;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailSender<AppUser> _emailSender;
        private readonly ApplicationDbContext _dbContext;

        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IEmailSender<AppUser> emailSender, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _dbContext = dbContext;
        }

        public string statusMessage { get; set; }


        [HttpGet]
        public async Task<ActionResult> CheckLoginStatus()
        {
            var isLoggedIn = HttpContext.User.Identity.IsAuthenticated;
            if (isLoggedIn)
            {
                var userId = HttpContext.User.GetUserId();
                var user = await _userManager.FindByIdAsync(userId);
                var userDto = new UserDto
                {
                    Id = userId,
                    UserName = user.UserName ?? user.Email,
                    NickName = user.NickName,
                    Email = user.Email
                };
                return Ok(new { isLoggedIn, userDto });
            }
            var errors = ValidationErrorMapper.CreateCustomErrors("user not logged in");
            //return BadRequest(new { Errors = errors });
            return Ok(new { isLoggedIn });

        }

        //  update username
        [HttpPost]
        public async Task<ActionResult> UpdateUserName([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                var modelStateErrors = ValidationErrorMapper.GetModelStatelErrors(ModelState);

                return BadRequest(new { Errors = modelStateErrors });
            }
            var isUser = await _userManager.FindByIdAsync(userDto.Id);
            if (isUser != null)
            {
                //  add nickName to user object (if applicable)
                isUser.NickName = userDto.NickName;
                var setUserName = await _userManager.SetUserNameAsync(isUser, userDto.UserName);

                if (setUserName.Succeeded)
                {
                    statusMessage = "user updated";
                    return Ok(new { statusMessage });
                }
            }
            var errors = ValidationErrorMapper.CreateCustomErrors("could not update username");
            return BadRequest(new
            {
                Errors = errors
            });
        }

        [HttpPost("changePassword")]
        public async Task<ActionResult> ChangePassword(ChangePasswordData changePasswordData)
        {
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = errors });
            }
            var userId = HttpContext.User.GetUserId();
            var user = await _userManager.FindByIdAsync(userId);
            //  check users password
            var hasPassword = await _userManager.HasPasswordAsync(user);
            if (!hasPassword)
            {
                var errors = ValidationErrorMapper.CreateCustomErrors("Password cannot be changed");
                return BadRequest(new
                {
                    Errors = errors
                });
            }
            var changePasswordResult = await _userManager.ChangePasswordAsync(user, changePasswordData.Password, changePasswordData.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                var message = $"Error: {string.Join(",", changePasswordResult.Errors.Select(error => error.Description))}";
                return BadRequest(new { Errors = ValidationErrorMapper.CreateCustomErrors(message) });
            }

            await _signInManager.RefreshSignInAsync(user);
            statusMessage = "Password changed Successfully!";
            return Ok(new { statusMessage });
        }

        //  change email address
        //  resend email confirmation
        [HttpPost("changeEmail")]
        public async Task<ActionResult> ChangeEmail([FromBody] ChangeEmailData changeEmailData)
        {
            //  validation
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = errors });
            }
            //  see if user already registered
            var isUser = await _userManager.FindByEmailAsync(changeEmailData.Email);
            if (isUser == null)
            {
                return BadRequest(new
                {
                    Errors = ValidationErrorMapper.GetCannotFindUserErrors()
                });
            }
            //  reset password
            var userId = await _userManager.GetUserIdAsync(isUser);
            var code = await _userManager.GenerateChangeEmailTokenAsync(isUser, changeEmailData.NewEmail);

            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["userId"] = userId.ToString();
            queryString["code"] = code.ToString();
            queryString["email"] = changeEmailData.NewEmail;

            Uri uri = new Uri(changeEmailData.ReturnUrl, UriKind.RelativeOrAbsolute);
            var returnUrl = uri.GetLeftPart(UriPartial.Authority) + "/account/confirmEmailChange?";

            string callbackUrlString = returnUrl + queryString.ToString();
            await _emailSender.SendConfirmationLinkAsync(isUser, changeEmailData.NewEmail, callbackUrlString);
            statusMessage = "Confirmation link to change email sent. Please check your email.!";
            return Ok(new { statusMessage });
        }

        //  confirm email
        [HttpPost("confirmEmailChange")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> ConfirmEmailChange([FromBody] ConfirmChangeEmailData confirmChangeEmailData)
        {
            //  validate
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new
                {
                    Errors = errors
                });
            };
            var user = await _userManager.FindByIdAsync(confirmChangeEmailData.UserId);
            //  no valid user
            if (user == null)
            {
                var errors = ValidationErrorMapper.CreateCustomErrors($"Unable to load user with ID '{confirmChangeEmailData.UserId}'.");
                return BadRequest(new
                {
                    Errors = errors
                });
            }
            //  on success
            else
            {
                var email = Uri.UnescapeDataString(confirmChangeEmailData.Email);
                //  must be decoded
                var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(confirmChangeEmailData.Code));
                //      change email
                var changeEmailResult = await _userManager.ChangeEmailAsync(user, email, code);

                //  send out confirmation email
                if (changeEmailResult.Succeeded)
                {
                    //  email address remains confirmed
                    statusMessage = "Email Address has been changed!";
                    return Ok(new { statusMessage });
                }
            }
            var error = ValidationErrorMapper.CreateCustomErrors("Could not modify email address");
            return BadRequest(new { Errors = error });
        }

        [HttpPost("deletePersonalData")]

        public async Task<ActionResult> DeletePersonalData([FromBody] DeletePersonalData deletePersonalData)
        {
            var errors = ValidationErrorMapper.CreateCustomErrors("Error! PersonalData Cannot be deleted");
            if (!ModelState.IsValid)
            {
                var modelStateErrors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = modelStateErrors });
            }
            //  compare user id's (frontend and backend)
            var backEndUserId = HttpContext.User.GetUserId();
            if (backEndUserId != deletePersonalData.UserId)
            {
                return BadRequest(new
                {
                    Errors = errors
                });
            }

            //  find user, delete all data connected to that user
            var user = await _userManager.FindByIdAsync(backEndUserId);


            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                await _signInManager.SignOutAsync();


                //  on success
                statusMessage = "PersonalData Deleted Successfully!";
                return Ok(new
                {
                    statusMessage,
                });
            }

            return BadRequest(new
            {
                Errors = errors
            });

        }


        //-------------------
        [HttpGet("downloadPersonalData")]
        public async Task<ActionResult> DownloadPersonalData()
        {
            var errors = ValidationErrorMapper.CreateCustomErrors($"Unable to load user with id '{HttpContext.User.GetUserId}");
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (user is null)
            {
                return BadRequest(new { Errors = errors });
                //return Results.NotFound($"Unable to load user with ID '{HttpContext.User.GetUserId()}'.");
            }

            var userId = await _userManager.GetUserIdAsync(user);

            // Only include personal data for download
            var personalData = new Dictionary<string, string>();
            var personalDataProps = typeof(AppUser).GetProperties().Where(
                prop => Attribute.IsDefined(prop, typeof(PersonalDataAttribute)));
            foreach (var p in personalDataProps)
            {
                personalData.Add(p.Name, p.GetValue(user)?.ToString() ?? "null");
            }

            var logins = await _userManager.GetLoginsAsync(user);
            foreach (var l in logins)
            {
                personalData.Add($"{l.LoginProvider} external login provider key", l.ProviderKey);
            }

            personalData.Add("Authenticator Key", (await _userManager.GetAuthenticatorKeyAsync(user))!);
            var fileBytes = JsonSerializer.SerializeToUtf8Bytes(personalData);

            HttpContext.Response.Headers.TryAdd("Content-Disposition", "attachment; filename=PersonalData.json");
            var result = TypedResults.File(fileBytes, contentType: "application/json", fileDownloadName: "PersonalData.json");
            return Ok(new { File = result });
        }


    }
}

