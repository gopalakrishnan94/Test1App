using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test1App.Models
{
    public class Cities
    {
        public int CityID { get; set; }
        public string CityName { get; set; }

        // // Foreign Key
        public int StateId { get; set; }
        public States States { get; set; }
    }
}