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
            var result = _context.TalentUsers.Join(_context.Users,
                         TalentUser => TalentUser.UserId,
                         user => user.UserId,
                         (TalentUser, user) => new
                         {
                             TalentUser.UserId,
                             user.UserName,
                             TalentUser.Talent,
                             TalentUser.City,
                             TalentUser.ContactPhone

                         }).ToList();

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
            var talentUser = await _context.TalentUsers.FindAsync(id);

            if (talentUser == null)
            {
                return NotFound();
            }

            return talentUser;
        }

        // PUT: api/TalentUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTalentUser(int id, TalentUser talentUser)
        {
            if (id != talentUser.UserId)
            {
                return BadRequest();
            }

            _context.Entry(talentUser).State = EntityState.Modified;

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
        public async Task<ActionResult<TalentUser>> PostTalentUser(TalentUser talentUser)
        {
            if (_context.TalentUsers == null)
            {
                return Problem("Entity set 'TalentNetworkContext.TalentUsers'  is null.");
            }
            _context.TalentUsers.Add(talentUser);
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
                 existingItem.ImageDataByte = imageData;

                await _context.SaveChangesAsync();
            }
            }
            catch
            {
                return Conflict();
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