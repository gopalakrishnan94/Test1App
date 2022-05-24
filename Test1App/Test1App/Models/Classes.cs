using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test1App.Models
{
    public class Classes
    {
        public int ClassID { get; set; }
        public string ClassName { get; set; }

        // Foreign Key
        public int TeacherId { get; set; }
        public Teachers Teachers { get; set; }

    }
}