using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EpiAPI.Services;
using EpiAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

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
        [HttpPost]
        public void Post([FromBody] Question newQuestion)
        {
            _db.Questions.Add(newQuestion);
            _db.SaveChanges();
        }
    }
}   