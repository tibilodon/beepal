using ReactApp1.Server.Models.Order;

namespace ReactApp1.Server.Interfaces
{
    public interface IOrderRepository
    {
        bool Add(OrderData orderData);
        bool Update(OrderData orderData);
        bool Delete(OrderData orderData);
        bool Save();
        Task<IEnumerable<OrderData>> GetAll();
        Task<OrderData> GetByIdAsync(string id);
        Task<OrderData> GetByIdAsyncNoTracking(string id);
        Task<List<OrderData>> GetAllOrdersForAppUser();


    }
}
