using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using EpiAPI.Helpers;
using EpiAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace EpiAPI.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        void Create(User user);
    }

    public class UserService : IUserService
    {
        private readonly EpiAPIContext _db;
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users;       

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings, EpiAPIContext db)
        {
            _appSettings = appSettings.Value;
            _db = db;
            _users = _db.Users.ToList();
        }

        public User Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.UserID.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }
        
        public void Create(User newUser)
        {
            // if(!_db.Users.Any( a => a.Username == newUser.Username))
            // {
                _db.Users.Add(newUser);
                _db.SaveChanges();
            // }
            
        }

        public IEnumerable<User> GetAll()
        {
            // return users without passwords
            return _users.Select(x => {
                x.Password = null;
                return x;
            });
        }
    }
}