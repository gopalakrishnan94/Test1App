using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Test1App.Context;
using Test1App.Models;
using Students = Test1App.Models.Students;
using dm = Test1App.Context;

namespace Test1App.Controllers
{
    public class StudentsController : ApiController
    {
        Test1AppEntities dbContext = new Test1AppEntities();

        #region GetAllStudents
        [HttpGet]
        public IHttpActionResult GetAllStudents()
        {
            IList<Students> students = null;

            students = dbContext.Students.Select(s => new Students()
            {
                StudentID = s.StudentID,
                StudentName = s.StudentName,
                StudentAge = s.StudentAge.HasValue ? s.StudentAge.Value : int.MinValue,
                StudentGender = s.StudentGender,
                ExamId = s.ExamId,
                PhoneNumber = s.PhoneNumber,
                EmailId = s.EmailId,
                Address = s.Address,
                ClassId = s.ClassId.HasValue ? s.ClassId.Value : int.MinValue,
                Classes = s.Class == null ? null : new Classes()
                {
                    ClassID = s.Class.ClassID,
                    ClassName = s.Class.ClassName
                }
            }).ToList<Students>();

            //if (students.Count == 0)
            //{
            //    return NotFound();
            //}

            return Ok(students);
        }

        #endregion

        #region GetStudent
        [HttpGet]
        public IHttpActionResult GetStudent(int id)
        {
            try
            {
                var student = dbContext.Students.Find(id);
                if (student == null) return BadRequest("No Record Found");
                else return Ok(student);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region CreateStudent
        [HttpPost]
        public IHttpActionResult CreateStudent(dm.Students data) 
        {
            try
            {
                dbContext.Students.Add(data);
                dbContext.SaveChanges();
                return Ok(new { IsSuccess = true, Message = "Record Saved Successfully" });
            } 
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region UpdateStudent
        [HttpPut]
        public IHttpActionResult UpdateStudent(dm.Students data)
        {
            try
            {
                var dbStudent = dbContext.Students.Find(data.StudentID);
                dbStudent.StudentAge = data.StudentAge > 0 ? data.StudentAge : dbStudent.StudentAge;
                dbStudent.StudentGender = data.StudentGender == null ? dbStudent.StudentGender : data.StudentGender;
                dbStudent.StudentName = data.StudentName == null ? dbStudent.StudentName : data.StudentName;
                dbStudent.PhoneNumber = data.PhoneNumber == null ? dbStudent.PhoneNumber : data.PhoneNumber;
                dbStudent.EmailId = data.EmailId == null ? dbStudent.EmailId : data.EmailId;
                dbStudent.ExamId = data.ExamId == null ? dbStudent.ExamId : data.ExamId;
                dbStudent.Address = data.Address == null ? dbStudent.Address : data.Address;
                dbStudent.ClassId = data.ClassId > 0 ? data.ClassId : dbStudent.ClassId;
                dbContext.SaveChanges();
                return Ok(new { IsSuccess = true, Message = "Record Updated Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region DeleteStudent
        [HttpDelete]
        public IHttpActionResult DeleteStudent(int id)
        {
            try
            {
                var student = dbContext.Students.Find(id);
                dbContext.Students.Remove(student);
                dbContext.SaveChanges();
                return Ok(new { IsSuccess = true, Message = "Record Deleted Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion
    }
}
