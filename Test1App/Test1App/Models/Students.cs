using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test1App.Models
{
    public class Students
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public int StudentAge { get; set; }
        public string StudentGender { get; set; }
        public string ExamId { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailId { get; set; }
        public string Address { get; set; }

        // Foreign Key
        public int ClassId { get; set; }
        public Classes Classes { get; set; }
    }
}