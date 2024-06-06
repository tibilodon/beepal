using ReactApp1.Server.Models;

namespace ReactApp1.Server.Interfaces
{
    public interface ICookieRepository
    {
        List<CartItem> GetCartItems(IRequestCookieCollection cookies);
        void SaveCartItems(IResponseCookies responseCookies, List<CartItem> cartItems);
        bool DeleteCartItem(IRequestCookieCollection requestCookies, IResponseCookies responseCookies, string id);
    }
}
