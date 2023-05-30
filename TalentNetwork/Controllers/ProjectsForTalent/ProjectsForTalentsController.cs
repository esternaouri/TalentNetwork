using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using TalentNetworDAL.Models;
using TalentNetwork.DTO;
namespace TalentNetwork.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProjectsForTalentsController : ControllerBase
    {
        private readonly TalentNetworkContext _context;

        public ProjectsForTalentsController(TalentNetworkContext context)
        {
            _context = context;
        }

        // GET: api/ProjectsForTalents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectsForTalent>>> GetProjectsForTalents()
        {
          if (_context.ProjectsForTalents == null)
          {
              return NotFound();
          }
            return await _context.ProjectsForTalents.ToListAsync();
        }

        // GET: api/ProjectsForTalents/5
        [HttpGet("{id}")]
        public IActionResult GetProjectsForTalent(int id)
        {
          if (_context.ProjectsForTalents == null)
          {
              return NotFound();
          }
            var projectsForTalent =  _context.ProjectsForTalents.Where(ID => ID.UserId == id).ToList();

            if (projectsForTalent == null)
            {
                return NotFound();
            }

            return Ok(projectsForTalent);
        }

        // PUT: api/ProjectsForTalents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectsForTalent(int id, ProjectsForTalent projectsForTalent)
        {
            if (id != projectsForTalent.ProjectId)
            {
                return BadRequest();
            }

            _context.Entry(projectsForTalent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectsForTalentExists(id))
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

        // POST: api/ProjectsForTalents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostProjectsForTalent(NewProjectDetails newProjectDetails)
        {
            try {
                if (_context.ProjectsForTalents == null)
                {
                    return Problem("Entity set 'TalentNetworkContext.ProjectsForTalents'  is null.");
                }

                var user = _context.Users.FirstOrDefault(u => u.UserId == newProjectDetails.UserId);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var post = new ProjectsForTalent
                {
                    ProjectId = newProjectDetails.ProjectId,
                    UserId = newProjectDetails.UserId,
                    ProjectName = newProjectDetails.ProjectName,
                    ProjectPrice = newProjectDetails.ProjectPrice,
                    User = user
                };
                _context.ProjectsForTalents.Add(post);

                _context.SaveChanges();


                return Ok(post);
            } catch(Exception e) {
                 return BadRequest(e);
            }
        }

        // DELETE: api/ProjectsForTalents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectsForTalent(int id)
        {
            if (_context.ProjectsForTalents == null)
            {
                return NotFound();
            }
            var projectsForTalent = await _context.ProjectsForTalents.FindAsync(id);
            if (projectsForTalent == null)
            {
                return NotFound();
            }

            _context.ProjectsForTalents.Remove(projectsForTalent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectsForTalentExists(int id)
        {
            return (_context.ProjectsForTalents?.Any(e => e.ProjectId == id)).GetValueOrDefault();
        }
    }
}
