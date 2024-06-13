using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models.Orders;

namespace ReactApp1.Server.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public OrderRepository(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public bool Add(OrderDetails OrderDetails)
        {
            _context.Add(OrderDetails);
            return Save();
        }

        public bool Delete(OrderDetails OrderDetails)
        {
            _context.Remove(OrderDetails);
            return Save();
        }


        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Update(OrderDetails OrderDetails)
        {
            _context.Update(OrderDetails);
            return Save();
        }

        public async Task<IEnumerable<OrderDetails>> GetAll()
        {
            return await _context.OrderDetails.ToListAsync();
        }

        public async Task<List<OrderDetails>> GetAllOrderDetailsForAppUser()
        {
            var curUser = _httpContextAccessor.HttpContext.User.GetUserId();
            return await _context.OrderDetails.Include(o => o.OrderDatas).Where(od => od.AppUserId == curUser).ToListAsync();
        }

        public async Task<OrderDetails> GetByIdAsync(string id)
        {
            return await _context.OrderDetails.Include(o => o.OrderDatas).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<OrderDetails> GetByIdAsyncNoTracking(string id)
        {
            return await _context.OrderDetails.AsNoTracking().Include(o => o.OrderDatas).FirstOrDefaultAsync(o => o.Id == id);


        }

        public Task<List<OrderDetails>> GetAllOrdersForAppUser()
        {
            throw new NotImplementedException();
        }
    }
}
