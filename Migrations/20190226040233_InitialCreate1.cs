using Microsoft.EntityFrameworkCore.Migrations;

namespace watchlist.Migrations
{
    public partial class InitialCreate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_MovieLists_MovieListMLId",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_MovieListMLId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "MovieListMLId",
                table: "Movies");

            migrationBuilder.RenameColumn(
                name: "MLId",
                table: "MovieLists",
                newName: "MovieListId");

            migrationBuilder.CreateTable(
                name: "MovieListEntry",
                columns: table => new
                {
                    MovieListId = table.Column<int>(nullable: false),
                    MovieId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieListEntry", x => new { x.MovieListId, x.MovieId });
                    table.ForeignKey(
                        name: "FK_MovieListEntry_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "MovieId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieListEntry_MovieLists_MovieListId",
                        column: x => x.MovieListId,
                        principalTable: "MovieLists",
                        principalColumn: "MovieListId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieListEntry_MovieId",
                table: "MovieListEntry",
                column: "MovieId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieListEntry");

            migrationBuilder.RenameColumn(
                name: "MovieListId",
                table: "MovieLists",
                newName: "MLId");

            migrationBuilder.AddColumn<int>(
                name: "MovieListMLId",
                table: "Movies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_MovieListMLId",
                table: "Movies",
                column: "MovieListMLId");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_MovieLists_MovieListMLId",
                table: "Movies",
                column: "MovieListMLId",
                principalTable: "MovieLists",
                principalColumn: "MLId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
