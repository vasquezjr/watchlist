﻿using System;
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
            //var movieListEntry = await _context.MovieListEntry.Include(mle => mle.Movie).SingleOrDefaultAsync(mle => mle.MovieListEntryId == id);

         
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

        // DELETE: api/MovieListEntries/movieListId/movieId
        [HttpDelete("{movieListId}/{movieId}")]
        public async Task<ActionResult<MovieListEntry>> DeleteMovieListEntry(int movieListId, int movieId)
        {
            var movieListEntry = await _context.MovieListEntry.Where(m => (m.MovieListId == movieListId) && (m.MovieId == movieId)).FirstOrDefaultAsync(); 

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
