using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace watchlist.Models
{
    public class Movie
    {
        [Required]
        public int MovieId { get; set; }

        [Required]
        public int MovieApiId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string MovieName { get; set; }

        public string MovieDescription { get; set; }
        public string MovieImage { get; set; }
        public string MovieTrailerLink { get; set; }


        public List<MovieListEntry> MovieListEntries { get; set; }

    }
}
