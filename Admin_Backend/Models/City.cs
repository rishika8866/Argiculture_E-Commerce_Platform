using System;
using System.Collections.Generic;

namespace Admin_Backend.Models
{
    public partial class City
    {
        public City()
        {
            Users = new HashSet<User>();
        }

        public int Cityid { get; set; }
        public string? Cityname { get; set; }
        public int CityId1 { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
