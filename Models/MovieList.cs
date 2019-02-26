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
        [Key]
        public int MLId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string MovieListName{ get; set; }

        public List<Movie> Movies { get; set; }
    }
}
