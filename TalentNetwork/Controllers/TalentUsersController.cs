using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentNetworDAL.Models;
using System.IO;
using TalentNetwork.DTO;
using System.Runtime.InteropServices;
using System.Net;

namespace TalentNetwork.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TalentUsersController : ControllerBase
    {
        private readonly TalentNetworkContext _context;

        public TalentUsersController(TalentNetworkContext context)
        {
            _context = context;
        }

        // GET: api/TalentUsers
        [HttpGet]
        public IActionResult GetTalentUsers()
        {
            if (_context.TalentUsers == null)
            {
                return NotFound();
            }

            var joinQuery = from a in _context.TalentUsers
                            join b in _context.Users on a.UserId equals b.UserId into temp
                            from b in temp.DefaultIfEmpty()
                            select new { a.UserId, a.Talent, a.City, a.ContactPhone, b.UserName,b.IsAdmin,b.Email};
            var result = joinQuery.ToList();

       
            return Ok(result);
        }

        // GET: api/TalentUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TalentUser>> GetTalentUser(int id)
        {

            if (_context.TalentUsers == null)
            {
                return NotFound();
            }

            var joinQuery = from a in _context.TalentUsers 
                            join b in _context.Users on a.UserId equals b.UserId into temp
                            from b in temp.DefaultIfEmpty()
                            select new { a.UserId, a.Talent, a.City, a.ContactPhone, b.UserName, b.IsAdmin, b.Email };
            var result = joinQuery.ToList();
            var userIndb =result.FirstOrDefault(x=> x.UserId==id);

            return Ok(userIndb);
          
        }

        // PUT: api/TalentUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTalentUser(int id, UserTalentPost talentUser)
        {
            if (id != talentUser.UserId)
            {
                return BadRequest();
            }
            var userIndb = _context.TalentUsers.FirstOrDefault(x => x.UserId == id);


            if (userIndb == null) 
            {
                var userInUsers = _context.Users.FirstOrDefault(x => x.UserId == id);

                var newTalent = new TalentUser
                {
                    City = talentUser.City,
                    Talent = talentUser.Talent,
                    ContactPhone = talentUser.ContactPhone,
                    UserId = talentUser.UserId,
                    ImageName = null,
                    ImageDataByte = null,
                    ImageDataToUse = null,
                    User = userInUsers
                };
                _context.TalentUsers.Add(newTalent);
                await _context.SaveChangesAsync();
            }
            else {
                var userInUsers = _context.Users.FirstOrDefault(x => x.UserId == id);
                userInUsers.Email=talentUser.Email;
                userIndb.Talent = talentUser.Talent;
                userIndb.City = talentUser.City;

                userIndb.ContactPhone = talentUser.ContactPhone;
                await _context.SaveChangesAsync();

                await _context.SaveChangesAsync();

            }


            await _context.SaveChangesAsync();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TalentUserExists(id))
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

        // POST: api/TalentUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostTalentUser(UserTalentPost talentUser)
        {
            if (_context.TalentUsers == null)
            {
                return Problem("Entity set 'TalentNetworkContext.TalentUsers'  is null.");
            }
            var user = _context.Users.FirstOrDefault(u => u.UserId == talentUser.UserId);
            var newTalent = new TalentUser {
                City = talentUser.City,
                Talent = talentUser.Talent,
                ContactPhone = talentUser.ContactPhone, 
                UserId = talentUser.UserId,
                ImageName=null,
                ImageDataByte= null,
                ImageDataToUse= null,
                User = user
            };
            _context.TalentUsers.Add(newTalent);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TalentUserExists(talentUser.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTalentUser", new { id = talentUser.UserId }, talentUser);
        }

        // DELETE: api/TalentUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTalentUser(int id)
        {
            if (_context.TalentUsers == null)
            {
                return NotFound();
            }
            var talentUser = await _context.TalentUsers.FindAsync(id);
            if (talentUser == null)
            {
                return NotFound();
            }

            _context.TalentUsers.Remove(talentUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }




        [HttpPost("Image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image,[FromForm]int userId)
        {
            // Check if a file was provided
            if (image == null || image.Length == 0)
            {
                return BadRequest("No file was provided.");
            }
            try
            {
                // Read the file into a byte array
                using (var memoryStream = new MemoryStream())
                {

                await image.CopyToAsync(memoryStream);
                var imageData = memoryStream.ToArray();

                
                 var existingItem = _context.TalentUsers.FirstOrDefault(item => item.UserId == userId);
                    if(existingItem == null) 
                    {
                        throw new Exception( "First Add Basic Info");

                    }
                    else 
                    {
                        existingItem.ImageDataByte = imageData;

                        await _context.SaveChangesAsync();
                    }
                 
            }
            }
            catch
            {
                return Conflict("First Add Basic Info");
            }
            return Ok(); // Return a success response
        }

        [HttpGet("Image/{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            // Retrieve the image from the database
            TalentUser imageEntity = await _context.TalentUsers.FindAsync(id);

            if (imageEntity == null)
            {
                return NotFound();
            }

            return File(imageEntity.ImageDataByte, "image/jpeg"); // Return the image data
        }



        private bool TalentUserExists(int id)
        {
            return (_context.TalentUsers?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}