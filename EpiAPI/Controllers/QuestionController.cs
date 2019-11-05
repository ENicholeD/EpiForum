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
    public class QuestionController : ControllerBase
    {
        private IUserService _userService;
        private readonly EpiAPIContext _db;

        public QuestionController(IUserService userService, EpiAPIContext db)
        {
            _userService = userService;
            _db = db;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Question>> GetAll()
        {
            
            var questions = _db.Questions.AsQueryable();
            return questions.ToList();
        }
        [Authorize]
        [HttpPost]
        public void Post([FromBody] Question newQuestion)
        {
            var identity = (ClaimsIdentity)User.Identity;
            var foundId = identity.FindFirst(ClaimTypes.Name).Value;
            newQuestion.UserID = Convert.ToInt32(foundId);
            _db.Questions.Add(newQuestion);
            _db.SaveChanges();
        }
      [HttpGet("{questionID}")]  
    public ActionResult <Question> GetSpecificQuestion(int questionID)
    {
        
    }
    }
}   