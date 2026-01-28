using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
            Payments = new HashSet<Payment>();
        }

        public int Oid { get; set; }
        public int TotalAmount { get; set; }
        public int? Uid { get; set; }
        public DateOnly ODate { get; set; }
        public string? Status { get; set; }

        public virtual User? UidNavigation { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
