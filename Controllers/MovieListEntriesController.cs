using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using watchlist.Models;

namespace watchlist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieListEntriesController : ControllerBase
    {
        private readonly MovieListContext _context;

        public MovieListEntriesController(MovieListContext context)
        {
            _context = context;
        }

        // GET: api/MovieListEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieListEntry>>> GetMovieListEntry()
        {
            return await _context.MovieListEntry.ToListAsync();
        }

        // GET: api/MovieListEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieListEntry>> GetMovieListEntry(int id)
        {
            var movieListEntry = await _context.MovieListEntry.FindAsync(id);

           // var movieList = await _context.MovieLists.Include("MovieListEntries").SingleOrDefaultAsync(i => i.MovieListId == id);

            if (movieListEntry == null)
            {
                return NotFound();
            }

            return movieListEntry;
        }

        // PUT: api/MovieListEntries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieListEntry(int id, MovieListEntry movieListEntry)
        {
            if (id != movieListEntry.MovieListId)
            {
                return BadRequest();
            }

            _context.Entry(movieListEntry).State = EntityState.Modified;
            



            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieListEntryExists(id))
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

        // POST: api/MovieListEntries
        [HttpPost]
        public async Task<ActionResult<MovieListEntry>> PostMovieListEntry(MovieListEntry movieListEntry)
        {
            _context.MovieListEntry.Add(movieListEntry);

            //var movieList = await _context.MovieLists.FindAsync(movieListEntry.MovieListId);
            //movieList.MovieListEntries.Add(movieListEntry);
            // MovieList ml = new Movielist
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MovieListEntryExists(movieListEntry.MovieListId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            
            return CreatedAtAction("GetMovieListEntry", new { id = movieListEntry.MovieListId }, movieListEntry);
        }

        // DELETE: api/MovieListEntries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieListEntry>> DeleteMovieListEntry(int id)
        {
            var movieListEntry = await _context.MovieListEntry.FindAsync(id);
            if (movieListEntry == null)
            {
                return NotFound();
            }

            _context.MovieListEntry.Remove(movieListEntry);
            await _context.SaveChangesAsync();

            return movieListEntry;
        }

        private bool MovieListEntryExists(int id)
        {
            return _context.MovieListEntry.Any(e => e.MovieListId == id);
        }
    }
}
