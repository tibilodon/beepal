using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Data.Enum;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.Dto;
using ReactApp1.Server.Models.Dto.Admin;

namespace ReactApp1.Server.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProductRepository(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public bool Add(Product product)
        {
            _context.Add(product);
            return Save();
        }

        public bool Delete(Product product)
        {
            _context.Remove(product);
            return Save();
        }
        //  return bool instead of int
        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Update(Product product)
        {
            _context.Update(product);
            return Save();
        }
        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(Category category)
        {

            return await _context.Products.Where(p => p.Category == category).ToListAsync();
        }

        public async Task<Product> GetByIdAsync(string id)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> GetByIdAsyncNoTracking(string id)
        {
            return await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<ProductDetailDto>> GetProductsByIds(List<string> productIds)
        {
            return await _context.Products.Where(p => productIds.Contains(p.Id))
                .Select(p => new ProductDetailDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Category = p.Category,
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    Packaging = p.Packaging,
                    Price = p.Price,
                    Stock = p.Stock,
                })
                .ToListAsync();
        }

        public async Task<bool> DeleteById(string id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            return Delete(product);

        }

        public async Task<IEnumerable<AdminProductDto>> AdminGetAll()
        {
            return await _context.Products.Select(p => new AdminProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                ImageUrl = p.ImageUrl,
                Category = p.Category,
                Packaging = p.Packaging,
                Price = p.Price,
                Stock = p.Stock,
                OrderDatas = p.OrderDatas.Select(od => new AdminOrderDetailsDto
                {
                    OrderId = od.OrderId,
                    OrderDate = od.OrderDetails.OrderDate,
                    IsFulfilled = od.OrderDetails.IsFulfilled,
                    Address = od.OrderDetails.Address,
                    Customer = new UserDto
                    {
                        Id = od.OrderDetails.AppUserId,
                        UserName = od.OrderDetails.AppUser.UserName,
                        NickName = od.OrderDetails.AppUser.NickName,
                        Email = od.OrderDetails.AppUser.Email
                    }
                }
               ).ToList()
            }).ToListAsync();
        }
    }
}
