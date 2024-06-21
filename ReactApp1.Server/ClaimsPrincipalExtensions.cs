using System.Security.Claims;

namespace ReactApp1.Server
{
    //  in order to access HttpContextAccessor - AppUserId
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {

            return user.FindFirst(ClaimTypes.NameIdentifier).Value;

        }

    }
}
