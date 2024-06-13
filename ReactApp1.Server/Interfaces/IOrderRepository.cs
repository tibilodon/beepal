using ReactApp1.Server.Models.Orders;

namespace ReactApp1.Server.Interfaces
{
    public interface IOrderRepository
    {
        bool Add(OrderDetails OrderDetails);
        bool Update(OrderDetails OrderDetails);
        bool Delete(OrderDetails OrderDetails);
        bool Save();
        Task<IEnumerable<OrderDetails>> GetAll();
        Task<OrderDetails> GetByIdAsync(string id);
        Task<OrderDetails> GetByIdAsyncNoTracking(string id);
        Task<List<OrderDetails>> GetAllOrdersForAppUser();


    }
}
