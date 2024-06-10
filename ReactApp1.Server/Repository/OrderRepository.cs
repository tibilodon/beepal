using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models.Order;

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

        public bool Add(OrderData orderData)
        {
            _context.Add(orderData);
            return Save();
        }

        public bool Delete(OrderData orderData)
        {
            _context.Remove(orderData);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Update(OrderData orderData)
        {
            _context.Update(orderData);
            return Save();
        }

        public async Task<IEnumerable<OrderData>> GetAll()
        {
            return await _context.OrderDatas.ToListAsync();
        }

        public async Task<List<OrderData>> GetAllOrdersForAppUser()
        {
            var curUser = _httpContextAccessor.HttpContext.User.GetUserId();
            return await _context.OrderDatas.Include(o => o.Product).Where(od => od.AppUserId == curUser).ToListAsync();
        }

        public async Task<OrderData> GetByIdAsync(string id)
        {
            return await _context.OrderDatas.Include(o => o.Product).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<OrderData> GetByIdAsyncNoTracking(string id)
        {
            return await _context.OrderDatas.AsNoTracking().Include(o => o.Product).FirstOrDefaultAsync(o => o.Id == id);


        }


    }
}
