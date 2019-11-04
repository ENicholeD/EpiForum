using Microsoft.EntityFrameworkCore;

namespace EpiAPI.Models
{
    public class EpiAPIContext : DbContext 
    {
        public EpiAPIContext(DbContextOptions<EpiAPIContext> options) : base (options)
        {

        }
        public DbSet<Answer> Answers {get;set;}
        public DbSet<Question> Questions {get;set;}
        public DbSet<User> Users {get;set;}
    }
}