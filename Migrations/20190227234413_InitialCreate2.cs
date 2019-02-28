using Microsoft.EntityFrameworkCore.Migrations;

namespace watchlist.Migrations
{
    public partial class InitialCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_MovieListEntry_MovieListEntryId",
                table: "MovieListEntry");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_MovieListEntry_MovieListEntryId",
                table: "MovieListEntry",
                column: "MovieListEntryId");
        }
    }
}
