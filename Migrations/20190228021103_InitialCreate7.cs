using Microsoft.EntityFrameworkCore.Migrations;

namespace watchlist.Migrations
{
    public partial class InitialCreate7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry");

            migrationBuilder.DropIndex(
                name: "IX_MovieListEntry_MovieListId",
                table: "MovieListEntry");

            migrationBuilder.DropColumn(
                name: "MovieListEntryId",
                table: "MovieListEntry");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry",
                columns: new[] { "MovieListId", "MovieId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry");

            migrationBuilder.AddColumn<int>(
                name: "MovieListEntryId",
                table: "MovieListEntry",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieListEntry",
                table: "MovieListEntry",
                columns: new[] { "MovieListEntryId", "MovieListId", "MovieId" });

            migrationBuilder.CreateIndex(
                name: "IX_MovieListEntry_MovieListId",
                table: "MovieListEntry",
                column: "MovieListId");
        }
    }
}
