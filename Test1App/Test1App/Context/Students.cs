//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Test1App.Context
{
    using System;
    using System.Collections.Generic;
    
    public partial class Students
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public Nullable<int> StudentAge { get; set; }
        public string StudentGender { get; set; }
        public string ExamId { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailId { get; set; }
        public string Address { get; set; }
        public Nullable<int> ClassId { get; set; }
    
        public virtual Class Class { get; set; }
    }
}
