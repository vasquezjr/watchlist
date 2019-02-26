using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace watchlist.Models
{
    public class MovieListContext : DbContext
    {
        public MovieListContext(DbContextOptions<MovieListContext> options) : base(options)
        { }

        public DbSet<MovieList> MovieLists { get; set; }
        public DbSet<Movie> Movies { get; set; }

        //Many to Many Relationship for MovieList and Movie
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieListEntry>()
                .HasKey(mle => new { mle.MovieListId, mle.MovieId });

            modelBuilder.Entity<MovieListEntry>()
                .HasOne(mle => mle.MovieList)
                .WithMany(ml => ml.MovieListEntries)
                .HasForeignKey(mle => mle.MovieListId);

            modelBuilder.Entity<MovieListEntry>()
                .HasOne(mle => mle.Movie)
                .WithMany(m => m.MovieListEntries)
                .HasForeignKey(mle => mle.MovieId);
        }
    }
}
