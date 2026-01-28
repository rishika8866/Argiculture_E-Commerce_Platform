using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class Payment
    {
        public int PId { get; set; }
        public DateOnly? Date { get; set; }
        public float? TotalAmt { get; set; }
        public int? Oid { get; set; }

        public virtual Order? OidNavigation { get; set; }
    }
}
