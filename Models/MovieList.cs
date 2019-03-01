using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace watchlist.Models
{
    public class MovieList
    {  
        [Required]
        public int MovieListId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string MovieListName{ get; set; }
        public List<MovieListEntry> MovieListEntries { get; set; }
    }
}
