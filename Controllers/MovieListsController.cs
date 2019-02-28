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
    public class MovieListsController : ControllerBase
    {
        private readonly MovieListContext _context;

        public MovieListsController(MovieListContext context)
        {
            _context = context;
        }

        // GET: api/MovieLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieList>>> GetMovieLists()
        {
            //return await _context.MovieLists.ToListAsync();
            return await _context.MovieLists.ToListAsync();
        }

        // GET: api/MovieLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieList>> GetMovieList(int id)
        {
            //var movieList = await _context.MovieLists.FindAsync(id);
            //var movieList = await _context.MovieLists.Include("MovieListEntries").SingleOrDefaultAsync(i => i.MovieListId == id);

            var movieList = await _context.MovieLists.Include(ml => ml.MovieListEntries).ThenInclude(mle => mle.Movie).SingleOrDefaultAsync(i => i.MovieListId == id);

            //var movieList = await _context.MovieLists.Include(ml => ml.MovieListEntries.Where(mle => mle.MovieListId == id)).SingleOrDefaultAsync();


            if (movieList == null)
            {
                return NotFound();
            }

            return movieList;
        }

        // PUT: api/MovieLists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieList(int id, MovieList movieList)
        {
            if (id != movieList.MovieListId)
            {
                return BadRequest();
            }

            MovieListEntry ml = new MovieListEntry { MovieId = 1, MovieListId = id };

            movieList.MovieListEntries.Add(ml);


            _context.Entry(movieList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieListExists(id))
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

        // POST: api/MovieLists
        [HttpPost]
        public async Task<ActionResult<MovieList>> PostMovieList(MovieList movieList)
        {
            _context.MovieLists.Add(movieList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovieList", new { id = movieList.MovieListId }, movieList);
        }

        // DELETE: api/MovieLists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieList>> DeleteMovieList(int id)
        {
            var movieList = await _context.MovieLists.FindAsync(id);
            if (movieList == null)
            {
                return NotFound();
            }

            _context.MovieLists.Remove(movieList);
            await _context.SaveChangesAsync();

            return movieList;
        }

        private bool MovieListExists(int id)
        {
            return _context.MovieLists.Any(e => e.MovieListId == id);
        }

    }
}
