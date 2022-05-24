using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Test1App.Context;
using Test1App.Models;
using Teachers = Test1App.Models.Teachers;
using dm = Test1App.Context;

namespace Test1App.Controllers
{
    public class TeachersController : ApiController
    {
        Test1AppEntities dbContext = new Test1AppEntities();

        #region GetAllTeachers
        [HttpGet]
        public IHttpActionResult GetAllTeachers()
        {
            IList<Teachers> teachers = null;

            teachers = dbContext.Teachers.Select(s => new Teachers()
            {
                TeacherID = s.TeacherID,
                TeacherName = s.TeacherName,
                TeacherAge = s.TeacherAge.HasValue ? s.TeacherAge.Value : int.MinValue,
                TeacherGender = s.TeacherGender,
                PhoneNumber = s.PhoneNumber,
                EmailId = s.EmailId,
                Address = s.Address
            }).ToList<Teachers>();

            //if (teachers.Count == 0)
            //{
            //    return NotFound();
            //}

            return Ok(teachers);
        }

        #endregion

        #region GetTeacher
        [HttpGet]
        public IHttpActionResult GetTeacher(int id)
        {
            try
            {
                var teacher = dbContext.Teachers.Find(id);
                if (teacher == null) return BadRequest("No Record Found");
                else return Ok(teacher);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region CreateTeacher
        [HttpPost]
        public IHttpActionResult CreateTeacher(dm.Teachers data)
        {
            try
            {
                dbContext.Teachers.Add(data);
                dbContext.SaveChanges();
                return Ok(new { IsSuccess = true, Message = "Record Saved Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region UpdateTeacher
        [HttpPut]
        public IHttpActionResult UpdateTeacher(dm.Teachers data)
        {
            try
            {
                var dbTeacher = dbContext.Teachers.Find(data.TeacherID);
                dbTeacher.TeacherName = data.TeacherName == null ? dbTeacher.TeacherName : data.TeacherName;
                dbTeacher.TeacherAge = data.TeacherAge > 0 ? data.TeacherAge : dbTeacher.TeacherAge;
                dbTeacher.TeacherGender = data.TeacherGender == null ? dbTeacher.TeacherGender : data.TeacherGender;
                dbTeacher.PhoneNumber = data.PhoneNumber == null ? dbTeacher.PhoneNumber : data.PhoneNumber;
                dbTeacher.EmailId = data.EmailId == null ? dbTeacher.EmailId : data.EmailId;
                dbTeacher.Address = data.Address == null ? dbTeacher.Address : data.Address;
                dbContext.SaveChanges();
                return Ok(new { IsSuccess = true, Message = "Record Updated Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region DeleteTeacher
        [HttpDelete]
        public IHttpActionResult DeleteTeacher(int id)
        {
            try
            {
                var teacher = dbContext.Teachers.Find(id);
                dbContext.Teachers.Remove(teacher);
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
