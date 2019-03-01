﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using watchlist.Models;

namespace watchlist.Migrations
{
    [DbContext(typeof(MovieListContext))]
    [Migration("20190301041432_Remodeled Database")]
    partial class RemodeledDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.2-servicing-10034")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("watchlist.Models.Movie", b =>
                {
                    b.Property<int>("MovieId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("MovieApiId");

                    b.Property<string>("MovieDescription");

                    b.Property<string>("MovieImage");

                    b.Property<string>("MovieName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("MovieTrailerLink");

                    b.HasKey("MovieId");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("watchlist.Models.MovieList", b =>
                {
                    b.Property<int>("MovieListId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MovieListName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("MovieListId");

                    b.ToTable("MovieLists");
                });

            modelBuilder.Entity("watchlist.Models.MovieListEntry", b =>
                {
                    b.Property<int>("MovieListId");

                    b.Property<int>("MovieId");

                    b.Property<int>("MovieRating");

                    b.HasKey("MovieListId", "MovieId");

                    b.HasIndex("MovieId");

                    b.ToTable("MovieListEntry");
                });

            modelBuilder.Entity("watchlist.Models.MovieListEntry", b =>
                {
                    b.HasOne("watchlist.Models.Movie", "Movie")
                        .WithMany("MovieListEntries")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("watchlist.Models.MovieList", "MovieList")
                        .WithMany("MovieListEntries")
                        .HasForeignKey("MovieListId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}