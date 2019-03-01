using Microsoft.EntityFrameworkCore.Migrations;

namespace watchlist.Migrations
{
    public partial class RemodeledDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MovieName",
                table: "Movies",
                type: "nvarchar(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(40)");

            migrationBuilder.AddColumn<string>(
                name: "MovieDescription",
                table: "Movies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MovieImage",
                table: "Movies",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MovieTrailerLink",
                table: "Movies",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MovieRating",
                table: "MovieListEntry",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovieDescription",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "MovieImage",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "MovieTrailerLink",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "MovieRating",
                table: "MovieListEntry");

            migrationBuilder.AlterColumn<string>(
                name: "MovieName",
                table: "Movies",
                type: "nvarchar(40)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)");
        }
    }
}
