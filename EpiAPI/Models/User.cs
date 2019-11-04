using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EpiAPI.Models
{
    public class User
    {
        public int UserID {get;set;}
        public string FirstName {get;set;}
        public string LastName {get;set;}
        public string Username {get;set;}
        public string Password {get;set;}
        public string Token {get;set;}
        public ICollection<Question> Questions {get;set;}
        public ICollection<Answer> Answers {get;set;}
        // public ICollection<Journal> Journals {get;set;}
        public User()
        {  
            this.Questions = new HashSet<Question>();
            this.Answers = new HashSet<Answer>();
            // this.Journals = new HashSet<Journal>();

        }
    }
}