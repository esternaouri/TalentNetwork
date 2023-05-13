using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentNetworDAL.Models;

namespace TalentNetwork.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<ActionResult<ProjectsForTalent>> GetProjectsForTalent(int id)
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

            return projectsForTalent;
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
        public async Task<ActionResult<ProjectsForTalent>> PostProjectsForTalent(ProjectsForTalent projectsForTalent)
        {
          if (_context.ProjectsForTalents == null)
          {
              return Problem("Entity set 'TalentNetworkContext.ProjectsForTalents'  is null.");
          }
            _context.ProjectsForTalents.Add(projectsForTalent);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProjectsForTalentExists(projectsForTalent.ProjectId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProjectsForTalent", new { id = projectsForTalent.ProjectId }, projectsForTalent);
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
