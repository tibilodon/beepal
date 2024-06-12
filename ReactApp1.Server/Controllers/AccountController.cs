
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using ReactApp1.Server.Data;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.Account;
using ReactApp1.Server.Models.Dto;
using System.Text;
using System.Web;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public string statusMessage { get; set; }
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender<AppUser> _emailSender;
        private readonly IUserStore<AppUser> _userStore;

        public AccountController(IUserStore<AppUser> userStore, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<AppUser> signInManager, ApplicationDbContext context, IEmailSender<AppUser> emailSender)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _context = context;
            _emailSender = emailSender;
            _userStore = userStore;

        }

        //  AppUser class creation handler
        private AppUser CreateUser()
        {
            try
            {
                return Activator.CreateInstance<AppUser>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(AppUser)}'. " +
                    $"Ensure that '{nameof(AppUser)}' is not an abstract class and has a parameterless constructor.");
            }
        }

        //  check if Usermanager supports user email
        private IUserEmailStore<AppUser> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<AppUser>)_userStore;
        }
        //  for errors
        private IEnumerable<IdentityError>? identityErrors;
        private string? Message => identityErrors is null ? null : $"Error: {string.Join(", ", identityErrors.Select(error => error.Description))}";

        //  register
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterData registerModel)
        {
            // validation
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = errors });
            }
            if (!await _roleManager.RoleExistsAsync(UserRoles.User))
            {
                //  create "user" role if does not already exist
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            }
            //  see if user already exists
            var isUser = await _userManager.FindByEmailAsync(registerModel.Email);
            if (isUser != null)
            {
                return BadRequest(new
                {
                    Errors = ValidationErrorMapper.GetUserAlreadyExistErrors()
                });
            }


            //  create new user
            var user = CreateUser();
            await _userStore.SetUserNameAsync(user, registerModel.Email, CancellationToken.None);
            var emailStore = GetEmailStore();
            await emailStore.SetEmailAsync(user, registerModel.Email, CancellationToken.None);
            var result = await _userManager.CreateAsync(user, registerModel.Password);


            //  handle errors
            if (!result.Succeeded)
            {
                var errors = ValidationErrorMapper.GetIdentityErrors(result.Errors);
                identityErrors = result.Errors;
                return BadRequest(new { Errors = errors });
            }

            await _userManager.AddToRoleAsync(user, UserRoles.User);
            //  required email confirmation
            var userId = await _userManager.GetUserIdAsync(user);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["userId"] = userId.ToString();
            queryString["code"] = code.ToString();

            Uri uri = new Uri(registerModel.returnUrl, UriKind.RelativeOrAbsolute);
            var returnUrl = uri.GetLeftPart(UriPartial.Authority) + "/account/confirmEmail?";

            string callbackUrlString = returnUrl + queryString.ToString();
            await _emailSender.SendConfirmationLinkAsync(user, registerModel.Email, callbackUrlString);

            return Ok("Successfully created");
        }

        [HttpPost("forgotpassword")]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordData forgotPasswordData)
        {
            //  validation
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = errors });
            }
            //  see if user already registered
            var isUser = await _userManager.FindByEmailAsync(forgotPasswordData.Email);
            if (isUser == null)
            {
                return BadRequest(new
                {
                    Errors = ValidationErrorMapper.GetCannotFindUserErrors()
                });
            }
            //  reset password
            var userId = await _userManager.GetUserIdAsync(isUser);
            var code = await _userManager.GeneratePasswordResetTokenAsync(isUser);

            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["userId"] = userId.ToString();
            queryString["code"] = code.ToString();

            Uri uri = new Uri(forgotPasswordData.returnUrl, UriKind.RelativeOrAbsolute);
            var returnUrl = uri.GetLeftPart(UriPartial.Authority) + "/account/resetPassword?";

            string callbackUrlString = returnUrl + queryString.ToString();
            await _emailSender.SendPasswordResetLinkAsync(isUser, forgotPasswordData.Email, callbackUrlString);

            return Ok("Recovery Email sent!");
        }

        //  reset password
        [HttpPost("resetpassword")]
        public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordData resetPasswordData)
        {
            //  validation
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = errors });
            }
            //  get user
            var user = await _userManager.FindByEmailAsync(resetPasswordData.Email);
            if (user == null)
            {
                return BadRequest(new
                {
                    Errors = ValidationErrorMapper.GetCannotFindUserErrors()
                });
            }
            if (resetPasswordData.Password == resetPasswordData.ConfirmPassword)
            {
                //  must be decoded
                var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(resetPasswordData.Code));
                var result = await _userManager.ResetPasswordAsync(user, code, resetPasswordData.Password);
                if (result.Succeeded)
                {
                    return Ok("Password Reset Successfull!");
                }
            }
            return BadRequest("Error! Password Cannot be reseted!");
        }

        //  confirm email
        [HttpPost("confirmEmail")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<ActionResult> ConfirmEmail([FromBody] ConfirmEmailData confirmEmail)
        {

            if (confirmEmail.UserId == null || confirmEmail.Code == null)
            {
                return BadRequest("userid or code is null");
            }
            var user = await _userManager.FindByIdAsync(confirmEmail.UserId);
            if (user == null)
            {
                //return NotFound($"Unable to load user with ID '{confirmEmail.UserId}'.");
                return Ok($"Unable to load user with ID '{confirmEmail.UserId}'.");
            }
            else
            {
                //  must be decoded
                var code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(confirmEmail.Code));
                //  disable React.Strict mode (useEffect causes optimistic concurrrency error, as it gets called twice on any initial render)
                var result = await _userManager.ConfirmEmailAsync(user, code);
                statusMessage = result.Succeeded ? "Thank you for confirming your email." : "Error confirming your email.";
                return Ok(new { statusMessage });

            }
        }

        //  resend email confirmation
        [HttpPost("resendemailconfirmation")]
        public async Task<ActionResult> ResendEmailConfirmation([FromBody] ForgotPasswordData forgotPasswordData)
        {
            //  validation
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = errors });
            }
            //  see if user already registered
            var isUser = await _userManager.FindByEmailAsync(forgotPasswordData.Email);
            if (isUser == null)
            {
                return BadRequest(new
                {
                    Errors = ValidationErrorMapper.GetCannotFindUserErrors()
                });
            }

            var userId = await _userManager.GetUserIdAsync(isUser);
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(isUser);

            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["userId"] = userId.ToString();
            queryString["code"] = code.ToString();

            Uri uri = new Uri(forgotPasswordData.returnUrl, UriKind.RelativeOrAbsolute);
            var returnUrl = uri.GetLeftPart(UriPartial.Authority) + "/account/confirmEmail?";

            string callbackUrlString = returnUrl + queryString.ToString();
            await _emailSender.SendConfirmationLinkAsync(isUser, forgotPasswordData.Email, callbackUrlString);

            return Ok("Recovery Email sent!");
        }



        //  login - using username and password
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginData loginData)
        {
            //  validation
            if (!ModelState.IsValid)
            {
                var errors = ValidationErrorMapper.GetModelStatelErrors(ModelState);
                return BadRequest(new { Errors = errors });
            }

            var user = await _userManager.FindByEmailAsync(loginData.Email);
            //  handle user error
            if (user == null)
            {
                return BadRequest(new
                {
                    Errors = ValidationErrorMapper.GetCannotFindUserErrors()
                });
            }
            if (user.EmailConfirmed == false)
            {
                var emailConfirm = ValidationErrorMapper.GetEmailNotConfirmedErrors();
                return BadRequest(new
                {
                    Errors = emailConfirm
                });
            }
            //  use userName from the user object
            var result = await _signInManager.PasswordSignInAsync(user, loginData.Password, loginData.RememberMe == "on" ? true : false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var isUser = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    NickName = user.NickName,
                    UserName = user.UserName
                };
                return Ok(new { userDto = isUser });
            }
            var error = ValidationErrorMapper.CreateCustomErrors("Login Failed!");
            return BadRequest(new
            {
                Errors = error
            }); ;
        }

        //  logout
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }


    }
}

