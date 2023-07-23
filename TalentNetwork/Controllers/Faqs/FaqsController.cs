
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentNetworDAL.Models;

namespace TalentNetwork.Controllers.Faqs
{
    [Route("/[controller]")]
    [ApiController]
    public class FaqsController : ControllerBase
    {
        private readonly TalentNetworkContext _context;
        public FaqsController(TalentNetworkContext context)
        {
            _context = context;
        }

        // GET: api/Faqs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Faq>>> GetFaqs()
        {
          if (_context.Faqs == null)
          {
              return NotFound();
          }
            return await _context.Faqs.ToListAsync();
        }

        // GET: api/Faqs/5
        [HttpGet("{id}")]
        public IActionResult GetFaq(int id)
        {
          if (_context.Faqs == null)
          {
              return NotFound();
          }
            var Faqs = _context.Faqs.Where(ID => ID.UserId == id).ToList();

            if (Faqs == null)
            {
                return NotFound();
            }

            return Ok(Faqs);
        }

        // PUT: api/Faqs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFaq(int id, AddFaq faq)
        {

            if (id != faq.FaqId)
            {
                return BadRequest();
            }


            var existingItem = _context.Faqs.FirstOrDefault(item => item.FaqId == id);
            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Question = faq.Question;
            existingItem.Answer = faq.Answer;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FaqExists(id))
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

        // POST: api/Faqs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Faq>> PostFaq(AddFaq faq)
        {
            try
            {
                if (_context.Faqs == null)
                {
                    return Problem("Entity set 'TalentNetworkContext.ProjectsForTalents'  is null.");
                }

                var user = _context.Users.FirstOrDefault(u => u.UserId == faq.UserId);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                var post = new Faq
                {

                    FaqId = _context.Faqs.Max(x => x.FaqId) + 1,
                    UserId = faq.UserId,
                    Question = faq.Question,
                    Answer = faq.Answer,
                    User = user
                };
                _context.Faqs.Add(post);

                _context.SaveChanges();


                return Ok(post);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // DELETE: api/Faqs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaq(int id)
        {
            if (_context.Faqs == null)
            {
                return NotFound();
            }
            var faq = await _context.Faqs.FindAsync(id);
            if (faq == null)
            {
                return NotFound();
            }

            _context.Faqs.Remove(faq);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FaqExists(int id)
        {
            return (_context.Faqs?.Any(e => e.FaqId == id)).GetValueOrDefault();
        }
    }
}
