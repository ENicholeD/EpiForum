using System.Collections.Generic;

namespace EpiAPI.Models
{
    public class Answer
    {
        public int ID {get;set;}
        public int QuestionID {get;set;}
        public string AnswerDescription {get; set;}
        public int UserId {get; set;}
        public User User {get;set;}

    }
}