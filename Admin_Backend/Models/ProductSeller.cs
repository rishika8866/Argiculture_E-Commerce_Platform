using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class ProductSeller
    {
        public ProductSeller()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int PsId { get; set; }
        public double Price { get; set; }
        public int Qty { get; set; }
        public int? PId { get; set; }
        public int? UId { get; set; }
        public ulong? Available { get; set; }

        public virtual Product? PIdNavigation { get; set; }
        public virtual User? UIdNavigation { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
