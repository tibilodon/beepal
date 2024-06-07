using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;
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
            int itemCounter = 0;
            foreach (var item in cartItems)
            {
                itemCounter = itemCounter + item.Quantity;
            }
            return Ok(new { cartItems, itemCounter });
        }

        [HttpPost("add")]

        //  add new if does not exists
        //  modify if exists with same id
        //      if variant does not match, add new item
        //      if item does match, quantity++
        public async Task<ActionResult> AddCartItem([FromBody] CartItem cartItem)
        {
            var requestCookies = HttpContext.Request.Cookies;
            var responseCookies = HttpContext.Response.Cookies;

            var cartItems = _cookieRepository.GetCartItems(requestCookies);
            //  check for item with same id
            var updateItem = cartItems.FirstOrDefault(x => x.Id == cartItem.Id && x.Variant == cartItem.Variant);
            //  if present
            if (updateItem != null)
            {
                //  if variants do not match => new item need to be added
                if (updateItem.Variant != cartItem.Variant)
                {
                    cartItems.Add(cartItem);

                    _cookieRepository.SaveCartItems(responseCookies, cartItems);
                    return Ok(new { cartItems });
                }
                //  otherwise, update the item
                updateItem.Quantity++;
                //updateItem.Variant = cartItem.Variant;
                _cookieRepository.SaveCartItems(responseCookies, cartItems);
                return Ok(new { cartItems });

            }
            //  item is not present in cookies, append it
            cartItems.Add(cartItem);
            _cookieRepository.SaveCartItems(responseCookies, cartItems);

            return Ok(new { cartItems });

        }

    }
}
