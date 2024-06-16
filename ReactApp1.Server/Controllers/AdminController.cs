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
        //  TODO:
        //      --handle errors

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
            var (isAuthenticated, result) = await AuthenticateAndAuthorizeAdmin();
            if (!isAuthenticated)
            {
                return result;
            }
            var products = await _productRepository.AdminGetAll();
            return Ok(new
            {
                products
            });
        }

        [HttpPost("product/add")]
        public async Task<ActionResult> AddProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //  check for admin
            var (isAuthenticated, result) = await AuthenticateAndAuthorizeAdmin();
            if (!isAuthenticated)
            {
                return result;
            }
            var id = Guid.NewGuid().ToString().ToUpper();
            product.Id = id;
            _productRepository.Add(product);
            var products = await _productRepository.GetAll();
            return Ok(new
            {
                products
            });
        }

        [HttpPut("product/update/{productId}")]
        public async Task<ActionResult> UpdateProduct(string productId, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //  check for admin
            var (isAuthenticated, result) = await AuthenticateAndAuthorizeAdmin();
            if (!isAuthenticated)
            {
                return result;
            }
            _productRepository.Update(product);
            var products = await _productRepository.GetAll();
            return Ok(new
            {
                products
            });
        }

        [HttpDelete("product/{productId}")]
        public async Task<ActionResult> DeleteProduct(string productId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //  check for admin
            var (isAuthenticated, result) = await AuthenticateAndAuthorizeAdmin();
            if (!isAuthenticated)
            {
                return result;
            }
            await _productRepository.DeleteById(productId);
            var products = await _productRepository.GetAll();
            return Ok(new
            {
                products
            });
        }




    }
}
