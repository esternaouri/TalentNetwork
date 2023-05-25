using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class _1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsAdmin = table.Column<int>(type: "int", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpires = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PhoneNumber = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Faqs",
                columns: table => new
                {
                    FaqID = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Question = table.Column<string>(type: "nchar(68)", fixedLength: true, maxLength: 68, nullable: true),
                    Answer = table.Column<string>(type: "nchar(68)", fixedLength: true, maxLength: 68, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faqs", x => x.FaqID);
                    table.ForeignKey(
                        name: "FK_Faqs_Users",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "ProjectsForTalents",
                columns: table => new
                {
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    ProjectName = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    ProjectPrice = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectsForTalents", x => x.ProjectId);
                    table.ForeignKey(
                        name: "FK_ProjectsForTalents_Users",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "TalentUsers",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    City = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true),
                    ContactPhone = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TalentUsers", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_TalentUsers_Users",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "IsAdmin", "Password", "PhoneNumber", "RefreshToken", "RefreshTokenExpires", "UserName" },
                values: new object[,]
                {
                    { 1, 1, "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==", null, null, null, "admin" },
                    { 11, 2, "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==", null, null, null, "u1" }
                });

            migrationBuilder.InsertData(
                table: "TalentUsers",
                columns: new[] { "UserId", "City", "ContactPhone" },
                values: new object[,]
                {
                    { 1, "Jerusalem", 528887454 },
                    { 11, "Tel-Aviv", 1354550453 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Faqs_UserId",
                table: "Faqs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectsForTalents_UserID",
                table: "ProjectsForTalents",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Faqs");

            migrationBuilder.DropTable(
                name: "ProjectsForTalents");

            migrationBuilder.DropTable(
                name: "TalentUsers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
