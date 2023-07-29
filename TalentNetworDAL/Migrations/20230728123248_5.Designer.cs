﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TalentNetworDAL.Models;

#nullable disable

namespace TalentNetworDAL.Migrations
{
    [DbContext(typeof(TalentNetworkContext))]
    [Migration("20230728123248_5")]
    partial class _5
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TalentNetworDAL.Models.Faq", b =>
                {
                    b.Property<int>("FaqId")
                        .HasColumnType("int")
                        .HasColumnName("FaqID");

                    b.Property<string>("Answer")
                        .HasMaxLength(1213565468)
                        .HasColumnType("nchar(1213565468)")
                        .IsFixedLength();

                    b.Property<string>("Question")
                        .HasMaxLength(1213565468)
                        .HasColumnType("nchar(1213565468)")
                        .IsFixedLength();

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FaqId");

                    b.HasIndex("UserId");

                    b.ToTable("Faqs");

                    b.HasData(
                        new
                        {
                            FaqId = 15,
                            Answer = "4 weeks",
                            Question = "How-long does it take to fins project? ",
                            UserId = 1
                        },
                        new
                        {
                            FaqId = 5,
                            Answer = "7 years",
                            Question = "How--much experience do you have?",
                            UserId = 1
                        },
                        new
                        {
                            FaqId = 6,
                            Answer = "8 weeks",
                            Question = "How-long does it take to finsh projec? ",
                            UserId = 11
                        },
                        new
                        {
                            FaqId = 7,
                            Answer = "17 years",
                            Question = "Ho-long does it take to finsh projec? ",
                            UserId = 11
                        },
                        new
                        {
                            FaqId = 59,
                            Answer = "17 years",
                            Question = "Ho-long finsh projec? ",
                            UserId = 11
                        });
                });

            modelBuilder.Entity("TalentNetworDAL.Models.ProjectsForTalent", b =>
                {
                    b.Property<int>("ProjectId")
                        .HasColumnType("int");

                    b.Property<string>("ProjectName")
                        .HasMaxLength(1423654)
                        .HasColumnType("nchar(1423654)")
                        .IsFixedLength();

                    b.Property<int?>("ProjectPrice")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("UserID");

                    b.HasKey("ProjectId");

                    b.HasIndex("UserId");

                    b.ToTable("ProjectsForTalents");

                    b.HasData(
                        new
                        {
                            ProjectId = 1,
                            ProjectName = "a proj",
                            ProjectPrice = 10000,
                            UserId = 1
                        },
                        new
                        {
                            ProjectId = 2,
                            ProjectName = "b proj",
                            ProjectPrice = 5000,
                            UserId = 1
                        },
                        new
                        {
                            ProjectId = 3,
                            ProjectName = "c proj ",
                            ProjectPrice = 14000,
                            UserId = 11
                        },
                        new
                        {
                            ProjectId = 4,
                            ProjectName = "d proj",
                            ProjectPrice = 54,
                            UserId = 11
                        });
                });

            modelBuilder.Entity("TalentNetworDAL.Models.TalentUser", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasMaxLength(10)
                        .HasColumnType("nchar(10)")
                        .IsFixedLength();

                    b.Property<int?>("ContactPhone")
                        .HasColumnType("int");

                    b.Property<byte[]>("ImageDataByte")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ImageDataToUse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Talent")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("TalentUsers");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            City = "Jerusalem",
                            ContactPhone = 528887454,
                            Talent = "javaScript devloper"
                        },
                        new
                        {
                            UserId = 11,
                            City = "Tel-Aviv",
                            ContactPhone = 1354550453,
                            Talent = "AI devlopper"
                        });
                });

            modelBuilder.Entity("TalentNetworDAL.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IsAdmin")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PhoneNumber")
                        .HasColumnType("int");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("RefreshTokenExpires")
                        .HasColumnType("datetime2");

                    b.Property<string>("UserName")
                        .HasMaxLength(10)
                        .HasColumnType("nchar(10)")
                        .IsFixedLength();

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            IsAdmin = 1,
                            Password = "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==",
                            UserName = "admin"
                        },
                        new
                        {
                            UserId = 11,
                            IsAdmin = 2,
                            Password = "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==",
                            UserName = "u1"
                        });
                });

            modelBuilder.Entity("TalentNetworDAL.Models.Faq", b =>
                {
                    b.HasOne("TalentNetworDAL.Models.User", "User")
                        .WithMany("Faqs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Faqs_Users");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TalentNetworDAL.Models.ProjectsForTalent", b =>
                {
                    b.HasOne("TalentNetworDAL.Models.User", "User")
                        .WithMany("ProjectsForTalents")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_ProjectsForTalents_Users");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TalentNetworDAL.Models.TalentUser", b =>
                {
                    b.HasOne("TalentNetworDAL.Models.User", "User")
                        .WithOne("TalentUser")
                        .HasForeignKey("TalentNetworDAL.Models.TalentUser", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_TalentUsers_Users");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TalentNetworDAL.Models.User", b =>
                {
                    b.Navigation("Faqs");

                    b.Navigation("ProjectsForTalents");

                    b.Navigation("TalentUser");
                });
#pragma warning restore 612, 618
        }
    }
}
