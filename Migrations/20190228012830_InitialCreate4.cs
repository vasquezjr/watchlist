using Microsoft.EntityFrameworkCore.Migrations;

namespace watchlist.Migrations
{
    public partial class InitialCreate4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_MovieListEntry_MovieListEntryId",
                table: "MovieListEntry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry",
                columns: new[] { "MovieListEntryId", "MovieListId", "MovieId" });

            migrationBuilder.CreateIndex(
                name: "IX_MovieListEntry_MovieListId",
                table: "MovieListEntry",
                column: "MovieListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry");

            migrationBuilder.DropIndex(
                name: "IX_MovieListEntry_MovieListId",
                table: "MovieListEntry");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_MovieListEntry_MovieListEntryId",
                table: "MovieListEntry",
                column: "MovieListEntryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry",
                columns: new[] { "MovieListId", "MovieId" });
        }
    }
}
