using System.ComponentModel.DataAnnotations;

namespace AutoServiceAPI.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Поле не повинно бути порожнім")]
        [Display(Name = "Марка авто")]
        public string Brand { get; set; }

        [Display(Name = "Модель")]
        public string Model { get; set; }

        [Display(Name = "Номерний знак")]
        public string LicensePlate { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public Car()
        {
            Orders = new List<Order>();
        }
    }
}