using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class OrderDetail
    {
        public int Odid { get; set; }
        public float Amt { get; set; }
        public long Quantity { get; set; }
        public int? Oid { get; set; }
        public int? PsId { get; set; }
        public int? Pid { get; set; }

        public virtual Order? OidNavigation { get; set; }
        public virtual Product? PidNavigation { get; set; }
        public virtual Product? Ps { get; set; }
        public virtual ProductSeller? PsNavigation { get; set; }
    }
}
