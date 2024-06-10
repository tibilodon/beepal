using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IProductRepository _productRepository;

        public AdminController(UserManager<AppUser> userManager, IProductRepository productRepository)
        {
            _userManager = userManager;
            _productRepository = productRepository;
        }

        //  helper
        private async Task<(bool isAuthenticated, ActionResult result)> AuthenticateAndAuthorizeAdmin()
        {
            // check for log status
            var isLoggedIn = HttpContext.User.Identity.IsAuthenticated;
            if (!isLoggedIn)
            {
                return (false, BadRequest(new { Errors = "Please log in!" }));
            }

            // get userId
            var userId = HttpContext.User.GetUserId();
            // find user
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return (false, BadRequest(new { Errors = "User cannot be found" }));
            }

            // check user role
            var userRole = await _userManager.IsInRoleAsync(user, "admin");
            if (!userRole)
            {
                return (false, BadRequest(new { Errors = "Unauthorized!" }));
            }

            return (true, null);
        }

        [HttpGet("products")]
        public async Task<ActionResult> GetProducts()
        {
            //check for log status
            //var isLoggedIn = HttpContext.User.Identity.IsAuthenticated;
            ////  handle unauthenticated
            //if (!isLoggedIn)
            //{
            //    return BadRequest(new { Errors = "Please log in!" });
            //}
            ////  get userId
            //var userId = HttpContext.User.GetUserId();
            ////  find user
            //var user = await _userManager.FindByIdAsync(userId);
            ////  handle error
            //if (user == null)
            //{
            //    return BadRequest(new { Errors = "User cannot be found" });

            //}
            ////  check user role
            //var userRole = await _userManager.IsInRoleAsync(user, "admin");
            ////  unauthorized
            //if (!userRole)
            //{
            //    return BadRequest(new { Errors = "Unauthorized!" });
            //};
            var (isAuthenticated, result) = await AuthenticateAndAuthorizeAdmin();
            if (!isAuthenticated)
            {
                return result;
            }
            var products = await _productRepository.GetAll();
            return Ok(new
            {
                products
            });
        }

        [HttpPost("add/product")]
        public async Task<ActionResult> AddProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var (isAuthenticated, result) = await AuthenticateAndAuthorizeAdmin();
            if (!isAuthenticated)
            {
                return result;
            }
            _productRepository.Add(product);
            var products = await _productRepository.GetAll();
            return Ok(new
            {
                products
            });

        }

    }

}
