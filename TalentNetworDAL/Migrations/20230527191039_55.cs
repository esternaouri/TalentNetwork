using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class _55 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ProjectsForTalents",
                columns: new[] { "ProjectId", "ProjectName", "ProjectPrice", "UserID" },
                values: new object[,]
                {
                    { 1, "a proj", 10000, 1 },
                    { 2, "b proj", 5000, 1 },
                    { 3, "c proj ", 14000, 11 },
                    { 4, "d proj", 54, 11 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProjectsForTalents",
                keyColumn: "ProjectId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ProjectsForTalents",
                keyColumn: "ProjectId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ProjectsForTalents",
                keyColumn: "ProjectId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ProjectsForTalents",
                keyColumn: "ProjectId",
                keyValue: 4);
        }
    }
}
