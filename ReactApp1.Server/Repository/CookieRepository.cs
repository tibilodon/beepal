using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;
using System.Text.Json;

namespace ReactApp1.Server.Repository
{
    public class CookieRepository : ICookieRepository
    {
        private const string CookieName = "cart";
        public bool DeleteCartItem(IRequestCookieCollection requestCookies, IResponseCookies responseCookies, string id)
        {
            var items = GetCartItems(requestCookies);
            var itemToRemove = items.FirstOrDefault(item => item.Id == id);
            if (itemToRemove != null)
            {
                items.Remove(itemToRemove);
                SaveCartItems(responseCookies, items);
                return true;
            }
            return false;
        }

        public List<CartItem> GetCartItems(IRequestCookieCollection cookies)
        {
            cookies.TryGetValue(CookieName, out var cookieValue);
            if (string.IsNullOrEmpty(cookieValue))
            {
                return new List<CartItem>();
            }
            return JsonSerializer.Deserialize<List<CartItem>>(cookieValue) ?? new List<CartItem>();
        }

        public void SaveCartItems(IResponseCookies cookies, List<CartItem> cartItems)
        {
            var cookieValue = JsonSerializer.Serialize(cartItems);
            cookies.Append(CookieName, cookieValue, new CookieOptions
            {
                Expires = DateTime.Now.AddDays(1),
            });
        }
    }
}
