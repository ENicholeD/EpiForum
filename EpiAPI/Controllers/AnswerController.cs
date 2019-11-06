using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EpiAPI.Services;
using EpiAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using EpiAPI;
using System.Security.Claims;

namespace EpiAPI.Controllers
{
    // [Authorize]
   [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private IUserService _userService;
        private readonly EpiAPIContext _db;

        public AnswerController(IUserService userService, EpiAPIContext db)
        {
            _userService = userService;
            _db = db;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Answer>> GetAll()
        {
            var answer = _db.Answers.AsQueryable();
            return answer.ToList();
        }
        [HttpPost("{id}")]
        public void Post([FromBody] Answer newAnswer, int id)
        {
            var identity = (ClaimsIdentity)User.Identity;
            var foundId = identity.FindFirst(ClaimTypes.Name).Value;
            newAnswer.UserId = Convert.ToInt32(foundId);
            newAnswer.QuestionID = id;
            _db.Answers.Add(newAnswer);
            _db.SaveChanges();
        }
    }
}   