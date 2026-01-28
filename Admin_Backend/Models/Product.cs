using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class Product
    {
        public Product()
        {
            OrderDetailPidNavigations = new HashSet<OrderDetail>();
            OrderDetailPs = new HashSet<OrderDetail>();
            ProductSellers = new HashSet<ProductSeller>();
        }

        public int Pid { get; set; }
        public string? Pname { get; set; }
        public int? CatId { get; set; }

        public virtual Category? Cat { get; set; }
        public virtual ICollection<OrderDetail> OrderDetailPidNavigations { get; set; }
        public virtual ICollection<OrderDetail> OrderDetailPs { get; set; }
        public virtual ICollection<ProductSeller> ProductSellers { get; set; }
    }
}
