using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace watchlist.Models
{
    public class MovieListEntry
    {
        [Key]
        public int MovieListEntryId { get; set; }

        public int MovieListId { get; set; }
        public MovieList MovieList { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }

    }
}
