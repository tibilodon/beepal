using ReactApp1.Server.Data.Enum;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.Dto;
using ReactApp1.Server.Models.Dto.Admin;

namespace ReactApp1.Server.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductDto>> GetAll();
        Task<IEnumerable<AdminProductDto>> AdminGetAll();
        Task<Product> GetByIdAsync(string id);
        Task<Product> GetByIdAsyncNoTracking(string id);
        Task<IEnumerable<Product>> GetByCategoryAsync(Category category);

        Task<List<CookieProductDetailDto>> GetProductsByIds(List<string> productIds);
        bool Add(Product product);
        bool Update(Product product);
        bool Delete(Product product);
        Task<bool> DeleteById(string id);
        bool Save();
    }
}
