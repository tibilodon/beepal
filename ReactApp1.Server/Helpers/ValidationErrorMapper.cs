using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;

namespace ReactApp1.Server.Helpers
{
    //  TODO: add interface
    public class EmailErrorResponse
    {
        [JsonPropertyName("Email")]
        public List<string> Email { get; set; }
    }

    public class ErrorResponse
    {
        [JsonPropertyName("Error")]
        public List<string> Error { get; set; }
    }
    public class ValidationErrorMapper
    {
        public static List<string> GetModelStatelErrors(ModelStateDictionary modelState)
        {
            return modelState.Values
                            .SelectMany(v => v.Errors)
                            .Select(e => e.ErrorMessage)
                            .ToList();
        }

        public static ErrorResponse GetIdentityErrors(IEnumerable<IdentityError> identityErrors)
        {
            var errors = identityErrors
                  .Select(e => e.Description)
                  .ToList();
            var errorResponse = new ErrorResponse
            {
                Error = errors
            };
            return errorResponse;

            //  return ErrorResponse type
        }
        public static EmailErrorResponse GetCannotFindUserErrors()
        {
            var errors = new List<string>()
            {
                "Cannot find registration with provided Email Address"
            };
            var errorResponse = new EmailErrorResponse
            {
                Email = errors
            };
            return errorResponse;
        }

        public static EmailErrorResponse GetUserAlreadyExistErrors()
        {
            var errors = new List<string>()
            {
                "Email address has already been registered!"
            };
            var errorResponse = new EmailErrorResponse
            {
                Email = errors
            };
            return errorResponse;
        }

        //  email validation error
        public static ErrorResponse GetEmailNotConfirmedErrors()
        {
            var errors = new List<string>()
            {
                "Login failed! Please confirm your email address."
            };
            var errorResponse = new ErrorResponse
            {
                Error = errors
            };
            return errorResponse;
        }

        public static ErrorResponse CreateCustomErrors(string errorMessage)
        {
            var errors = new List<string>()
            {
                errorMessage
            };
            var errorResponse = new ErrorResponse
            {
                Error = errors
            };
            return errorResponse;
        }

    }

}
