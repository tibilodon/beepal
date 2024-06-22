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
        private readonly IHttpContextAccessor _contextAccessor;

        public CookieController(ICookieRepository cookieRepository, IProductRepository productRepository, IHttpContextAccessor contextAccessor)
        {
            _cookieRepository = cookieRepository;
            _productRepository = productRepository;
            _contextAccessor = contextAccessor;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {

            var requestCookies = HttpContext.Request.Cookies;
            //  get cookies
            var cartItems = _cookieRepository.GetCartItems(requestCookies);
            //  extract ids and push them into an array
            var productIds = cartItems.Select(item => item.Id).ToList();
            //  get products based on the ids array
            var products = await _productRepository.GetProductsByIds(productIds);

            //  add valid PlacedInCartQuantity values to the object

            var data = new List<CookieProductDetailDto>();
            //  loop through cartItems, as products with the same id can be present with a diffrent variable
            foreach (var items in cartItems)
            {
                //  find the item with the matching id
                var prod = products.FirstOrDefault(item => item.Id == items.Id);
                if (prod != null)
                {
                    var newItem = new CookieProductDetailDto
                    {
                        Id = items.Id,
                        Name = prod.Name,
                        Packaging = items.Packaging,
                        Category = prod.Category,
                        CreatedAt = prod.CreatedAt,
                        Description = prod.Description,
                        ImageUrl = prod.ImageUrl,
                        PlacedInCartQuantity = items.PlacedInCartQuantity,
                        Price = prod.Price,
                        Stock = prod.Stock,
                        UpdatedAt = prod.UpdatedAt,
                    };
                    data.Add(newItem);

                }

            }
            //  summorize all items in the cart
            int itemCounter = cartItems.Sum(item => item.PlacedInCartQuantity);
            int totalAmount = data.Sum(prod => prod.PlacedInCartQuantity * ((int)prod.Packaging * prod.Price));
            return Ok(new { products = data, itemCounter, totalAmount });
        }

        [HttpPost("add")]

        //  add new if does not exists
        //  modify if exists with same id
        //      if variant does not match, add new item
        //      if item does match, quantity++
        //  return ProductDetailDto
        public async Task<ActionResult> AddCartItem([FromBody] CookieProductDetailDto productDetailDto)
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
                }
                //  otherwise, update the item
                else
                {
                    updateItem.PlacedInCartQuantity++;

                }
            }
            else
            {
                cartItems.Add(cartItem);
            }
            _cookieRepository.SaveCartItems(responseCookies, cartItems);

            return Ok("item added to cart");

        }

        [HttpDelete("{productId}/{packaging}")]
        public async Task<ActionResult> DeleteCookie(string productId, int packaging)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var requestCookies = HttpContext.Request.Cookies;
            var responseCookies = HttpContext.Response.Cookies;

            var result = _cookieRepository.DeleteCartItem(requestCookies, responseCookies, productId, packaging);
            if (result)
            {
                return Ok("Successfully deleted!");

            }
            else
            {
                return BadRequest("Product Cannot be deleted");
            }
        }


    }
}
