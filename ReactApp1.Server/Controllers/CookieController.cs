using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Interfaces;
//using ReactApp1.Server.Repository;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CookieController : ControllerBase
    {
        private readonly ICookieRepository _cookieRepository;

        public CookieController(ICookieRepository cookieRepository)
        {
            _cookieRepository = cookieRepository;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var requestCookies = HttpContext.Request.Cookies;
            var cartItems = _cookieRepository.GetCartItems(requestCookies);
            return Ok(new { cartItems });
        }


    }
}
