using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class SubCategory
    {
        public int ScId { get; set; }
        public string ScName { get; set; } = null!;
        public int? CatId { get; set; }

        public virtual Category? Cat { get; set; }
    }
}
