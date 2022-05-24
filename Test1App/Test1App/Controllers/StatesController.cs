using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Test1App.Context;
using Test1App.Models;
using States = Test1App.Models.States;

namespace Test1App.Controllers
{
    public class StatesController : ApiController
    {
        Test1AppEntities dbContext = new Test1AppEntities();
        public IHttpActionResult GetAllStates()
        {
            IList<States> states = null;

            states = dbContext.State.Select(s => new States()
            {
                StateID = s.StateID,
                StateName = s.StateName
            }).ToList<States>();

            if (states.Count == 0)
            {
                return NotFound();
            }

            return Ok(states);
        }
    }
}
