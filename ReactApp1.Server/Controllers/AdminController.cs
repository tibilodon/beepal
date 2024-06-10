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
        [HttpGet("products")]
        public async Task<ActionResult> GetProducts()
        {
            //check for log status
            var isLoggedIn = HttpContext.User.Identity.IsAuthenticated;
            //  handle unauthenticated
            if (!isLoggedIn)
            {
                return BadRequest(new { Errors = "Please log in!" });
            }
            //  get userId
            var userId = HttpContext.User.GetUserId();
            //  find user
            var user = await _userManager.FindByIdAsync(userId);
            //  handle error
            if (user == null)
            {
                return BadRequest(new { Errors = "User cannot be found" });

            }
            //  check user role
            var userRole = await _userManager.IsInRoleAsync(user, "admin");
            //  unauthorized
            if (!userRole)
            {
                return BadRequest(new { Errors = "Unauthorized!" });
            };
            var products = await _productRepository.GetAll();
            return Ok(new
            {
                products
            });
            //if(role.Contains("admin"))

        }
    }

}
