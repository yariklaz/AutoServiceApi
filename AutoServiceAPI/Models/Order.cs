using System.ComponentModel.DataAnnotations;

namespace AutoServiceAPI.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Display(Name = "Час створення")]
        public DateTime CreatedAt { get; set; }

        [Display(Name = "Час завершення")]
        public DateTime? CompletionTime { get; set; }

        [Display(Name = "Статус")]
        public string Status { get; set; }

        // Зв'язок з автомобілем (одне замовлення - одне авто)
        public int CarId { get; set; }
        public virtual Car Car { get; set; }

        // Зв'язок з послугами (одне замовлення - багато послуг)
        public virtual ICollection<OrderService> OrderServices { get; set; }

        public Order()
        {
            OrderServices = new List<OrderService>();
            CreatedAt = DateTime.Now; // Автоматично ставимо час створення
        }
    }
}