using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
            ProductSellers = new HashSet<ProductSeller>();
        }

        public int Uid { get; set; }
        public string? Uname { get; set; }
        public string? Email { get; set; }
        public string? ContactNo { get; set; }
        public string? AccNo { get; set; }
        public string Password { get; set; } = null!;
        public string? Address { get; set; }
        public int? Rid { get; set; }
        public int? CityId { get; set; }

        public virtual City? City { get; set; }
        public virtual Role? RidNavigation { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ProductSeller> ProductSellers { get; set; }
    }
}
