using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.Dto;
//using ReactApp1.Server.Repository;

namespace ReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CookieController : ControllerBase
    {
        private readonly ICookieRepository _cookieRepository;
        private readonly IProductRepository _productRepository;

        public CookieController(ICookieRepository cookieRepository, IProductRepository productRepository)
        {
            _cookieRepository = cookieRepository;
            _productRepository = productRepository;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var requestCookies = HttpContext.Request.Cookies;
            var cartItems = _cookieRepository.GetCartItems(requestCookies);
            //  initiate new list for product ids
            List<string> productIds = new List<string>();

            int itemCounter = 0;
            foreach (var item in cartItems)
            {
                productIds.Add(item.Id);
                itemCounter += item.PlacedInCartQuantity;
            }
            var products = await _productRepository.GetProductsByIds(productIds);
            return Ok(new { products, itemCounter });
        }

        [HttpPost("add")]

        //  add new if does not exists
        //  modify if exists with same id
        //      if variant does not match, add new item
        //      if item does match, quantity++
        //  return ProductDetailDto
        public async Task<ActionResult> AddCartItem([FromBody] ProductDetailDto productDetailDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //  check product validity
            var checkProduct = await _productRepository.GetByIdAsync(productDetailDto.Id);
            if (checkProduct == null)
            {
                return BadRequest("Product is not valid");
            }
            var requestCookies = HttpContext.Request.Cookies;
            var responseCookies = HttpContext.Response.Cookies;

            var cartItems = _cookieRepository.GetCartItems(requestCookies);
            var cartItem = new CartItem()
            {
                Id = productDetailDto.Id,
                PlacedInCartQuantity = productDetailDto.PlacedInCartQuantity,
                Packaging = productDetailDto.Packaging,
            };
            //  check for item with same id
            var updateItem = cartItems.FirstOrDefault(x => x.Id == cartItem.Id && x.Packaging == cartItem.Packaging);
            //  if present
            if (updateItem != null)
            {
                //  if variants do not match => new item need to be added
                if (updateItem.Packaging != cartItem.Packaging)
                {
                    cartItems.Add(cartItem);

                    _cookieRepository.SaveCartItems(responseCookies, cartItems);
                    return Ok(Get());
                }
                //  otherwise, update the item
                updateItem.PlacedInCartQuantity++;
                //updateItem.Packaging = cartItem.Packaging;
                _cookieRepository.SaveCartItems(responseCookies, cartItems);
                return Ok(Get());

                //return Ok(new { cartItems });

            }
            //  item is not present in cookies, append it
            cartItems.Add(cartItem);
            _cookieRepository.SaveCartItems(responseCookies, cartItems);

            //return Ok(new { cartItems });
            return Ok(Get());


        }

    }
}
