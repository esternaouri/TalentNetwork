using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MessagePack;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentNetworDAL.Models;
using TalentNetwork.DTO;
namespace TalentNetwork.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TalentNetworkContext _context;
        TokensManager _TokensManager;

        public UsersController(TalentNetworkContext context, TokensManager tokensManager)
        {
            _context = context;
            _TokensManager = tokensManager;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }
        [HttpGet("{userID:int}")]
        public IActionResult Get(int userID)
        {
            var user = _context.Users.Find(userID);
            if (user == null)
                return NotFound();
            else
                //return Ok(new { user.UserId,user.UserName,user.RoleID});//anonymous class instance
                return Ok(new UserResponse(user));
        }

        [HttpPost("register")]
        public IActionResult Register(UserRegist user)
        {
            var userInDb = _context.Users.FirstOrDefault(u => u.UserId == user.UserId);
           // var maxId = _context.Users.Max(u=>u.UserId);

            if (userInDb == null)
            {
                var ph = new PasswordHasher<UserRegist>();
                user.Password = ph.HashPassword(user, user.Password);

                var post = new User
                {
                    IsAdmin = 1,
                    UserName = user.UserName,
                    Password = user.Password,
                    UserId = user.UserId,
                    PhoneNumber = null,
                    RefreshToken = null,
                    RefreshTokenExpires = null,
                    Email = user.Email,
                };

                _context.Users.Add(post);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest("invalid user name ,allready exists");
            }
        }
        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            var userInDb = _context.Users.FirstOrDefault(u => u.UserId == user.UserId);
            if (userInDb == null)
                return Unauthorized("invalid user name or password");
            else
            {
                var ph = new PasswordHasher<User>();
                var result = ph.VerifyHashedPassword(userInDb, userInDb.Password, user.Password);
                //var userInDb = _ShopDbContext.Users.FirstOrDefault(u => u.UserName == user.UserName && u.Password == user.Password);
                //if (userInDb == null)
                if (userInDb == null || result == PasswordVerificationResult.Failed)
                    return Unauthorized("invalid user name or password");
                else
                {

                    TokensData td = td = CreateTokens(userInDb);

                    return Ok(userInDb);
                }
            }
        }
        [HttpPost("refreshTokenAdmin")]
        public IActionResult refreshTokenAdmin(TokensData td)
        {
            var userInDb = _context.Users.FirstOrDefault(u => u.RefreshToken == td.RefreshToken);

            var isAdmine = userInDb.IsAdmin;

            return Ok(isAdmine.ToString());

        }
        [HttpPost("refreshToken")]
        public IActionResult RefreshToken(TokensData td)
        {
            var userInDb = _context.Users.FirstOrDefault(u => u.RefreshToken == td.RefreshToken && u.RefreshTokenExpires > DateTime.Now);
            if (userInDb == null)
            {
                return Unauthorized("token invalid");
            }
            else
            {
                td = CreateTokens(userInDb);

                return Ok(td);
            }
        }

        [HttpGet("test1")]
        public string Test()
        {
            return "Hello World test1";
        }

        [HttpGet("test2")]
        [Authorize]
        public string Test2()
        {
            return "Hello World test2";
        }


        TokensData CreateTokens(User user)
        {
            TokensData td = _TokensManager.GetInitializedTokens(user);
            //SaveCookiesToResponse(td);
            SaveRefreshToken2DB(user, td);
            return td;
        }

        void SaveCookiesToResponse(TokensData td)
        {
            Response.Cookies.Append("accessToken", td.AccessToken, new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = td.AccessTokenExpires
            });
            Response.Cookies.Append("refreshToken", td.RefreshToken, new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = td.RefreshTokenExpires
            });
        }

        void SaveRefreshToken2DB(User userInDb, TokensData td)
        {
            userInDb.RefreshToken = td.RefreshToken;
            userInDb.RefreshTokenExpires = td.RefreshTokenExpires;
            _context.SaveChanges();
        }


        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, EditUser user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            var existingItem = _context.Users.FirstOrDefault(u => u.UserId == user.UserId);
            if (existingItem == null)
            {
                return NotFound();
            }
            


            var ph = new PasswordHasher<EditUser>();
            user.Password = ph.HashPassword(user, user.Password);


            existingItem.UserName = user.UserName;
            existingItem.Password = user.Password;
            existingItem.IsAdmin = user.IsAdmin;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();


        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'TalentNetworkContext.Users'  is null.");
            }
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var userInUsers = _context.Users.FirstOrDefault(u => u.UserId == id);
            
            if (userInUsers == null)
            {
                return NotFound();
            }
            var userInUsersTalents = _context.TalentUsers.FirstOrDefault(u => u.UserId == id);
            var projectForTalent = _context.ProjectsForTalents.FirstOrDefault(u => u.UserId == id);
            var FAQ = _context.Faqs.FirstOrDefault(f => f.UserId == id);

            if (userInUsersTalents !=null)
            {
                _context.TalentUsers.Remove(userInUsersTalents);
                _context.SaveChanges();
            }

            if (projectForTalent != null)
            {
                _context.ProjectsForTalents.Remove(projectForTalent);
                _context.SaveChanges();
            }
            if (FAQ != null)
            {
                _context.Faqs.Remove(FAQ);
                _context.SaveChanges();
            }

                _context.Users.Remove(userInUsers);

            _context.SaveChanges();
                return Ok("OK");
        }

    

    private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }

}