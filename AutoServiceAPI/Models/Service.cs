using System.ComponentModel.DataAnnotations;

namespace AutoServiceAPI.Models
{
    public class Service
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Поле не повинно бути порожнім")]
        [Display(Name = "Назва послуги")]
        public string Name { get; set; }

        [Display(Name = "Опис послуги")]
        public string? Description { get; set; }

        [Required]
        [Display(Name = "Вартість")]
        public decimal Price { get; set; }

        public virtual ICollection<OrderService> OrderServices { get; set; }

        public Service()
        {
            OrderServices = new List<OrderService>();
        }
    }
}