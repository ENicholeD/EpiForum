using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace EpiAPI.Models
{
    public class Question
    {
        public int ID {get;set;}
        public int UserID {get;set;}
        public User User {get;set;}
        public string QuestionDescription {get;set;}
        public ICollection<Answer> Answers {get;set;}
        public Question()
        {
            this.Answers = new HashSet<Answer>();
        }
        
    }
}