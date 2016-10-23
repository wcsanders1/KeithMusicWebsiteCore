using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using KeithMusicWebsiteCore.Models;

namespace KeithMusicWebsiteCore.Migrations
{
    [DbContext(typeof(SiteContext))]
    [Migration("20161023140034_InitialDatabase")]
    partial class InitialDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("KeithMusicWebsiteCore.Models.News", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<string>("Location");

                    b.Property<string>("MiscHtml");

                    b.HasKey("Id");

                    b.ToTable("NewsItems");
                });

            modelBuilder.Entity("KeithMusicWebsiteCore.Models.Song", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AudioFileMP3");

                    b.Property<string>("AudioFileOGG");

                    b.Property<string>("Lyrics");

                    b.Property<string>("Snippet");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Songs");
                });

            modelBuilder.Entity("KeithMusicWebsiteCore.Models.YouTubeLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Caption");

                    b.Property<string>("Headline");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("YouTubeLinks");
                });
        }
    }
}
