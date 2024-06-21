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
            //var cartItems = _cookieRepository.GetCartItems(requestCookies);
            ////  initiate new list for product ids
            //List<string> productIds = new List<string>();

            //int itemCounter = 0;
            //foreach (var item in cartItems)
            //{
            //    productIds.Add(item.Id);
            //    itemCounter += item.PlacedInCartQuantity;
            //}
            //var products = await _productRepository.GetProductsByIds(productIds);
            ////  append quantity to result
            //foreach (var product in products)
            //{
            //    var cartItem = cartItems.FirstOrDefault(item => item.Id == product.Id);
            //    if (cartItem != null)
            //    {
            //        product.PlacedInCartQuantity = cartItem.PlacedInCartQuantity;
            //    }
            //}


            //  get cookies
            var cartItems = _cookieRepository.GetCartItems(requestCookies);
            //  extract ids and push them into an array
            var productIds = cartItems.Select(item => item.Id).ToList();
            //  get products based on the ids array
            var products = await _productRepository.GetProductsByIds(productIds);

            //  add valid PlacedInCartQuantity values to the object
            foreach (var product in products)
            {
                //  find the item with the matching id
                var prod = cartItems.FirstOrDefault(item => item.Id == product.Id);
                if (prod != null)
                {
                    product.PlacedInCartQuantity = prod.PlacedInCartQuantity;
                }
            }
            //  summorize all items in the cart
            int itemCounter = cartItems.Sum(item => item.PlacedInCartQuantity);



            return Ok(new { products, itemCounter});
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

                    //_cookieRepository.SaveCartItems(responseCookies, cartItems);
                    //var newData = await Get();
                    //return Ok(new { data = newData });
                }
                //  otherwise, update the item
                else
                {
                    updateItem.PlacedInCartQuantity++;

                }
                //cartItem.PlacedInCartQuantity += updateItem.PlacedInCartQuantity++;
                //updateItem.Packaging = cartItem.Packaging;
                //_cookieRepository.SaveCartItems(responseCookies, cartItems);
                //var newAmountData = await Get();
                //return Ok(new { data = newAmountData });

                //return Ok(new { cartItems });

            }
            else
            {
                cartItems.Add(cartItem);
            }
            //  item is not present in cookies, append it
            //cartItems.Add(cartItem);
            _cookieRepository.SaveCartItems(responseCookies, cartItems);
            //UpdateRequestCookies(responseCookies, cartItems);
            //var data = await Get();
            //return Ok(new { data });
            //return Ok(Get());

            //  TODO://////////
            //var ez = _contextAccessor.HttpContext.Request.Cookies;
            ////var ezItems = _cookieRepository.GetCartItems(ez);
            ////responseCookies = HttpContext.Response.Cookies;

            //var newCartItems = _cookieRepository.GetCartItems(ez);
            //var newProductIds = newCartItems.Select(item => item.Id).ToList();
            //var newProducts = await _productRepository.GetProductsByIds(newProductIds);

            //foreach (var product in newProducts)
            //{
            //    var newCartItem = newCartItems.FirstOrDefault(item => item.Id == product.Id);
            //    if (newCartItem != null)
            //    {
            //        product.PlacedInCartQuantity = newCartItem.PlacedInCartQuantity;
            //    }
            //}

            //int newItemCounter = newCartItems.Sum(item => item.PlacedInCartQuantity);

            //return Ok(new { products = newProducts, itemCounter = newItemCounter });
            return Ok("item added to cart");

        }



    }
}
