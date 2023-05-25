using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class w : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Talent",
                table: "TalentUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "TalentUsers",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Talent",
                value: "javaScript devloper");

            migrationBuilder.UpdateData(
                table: "TalentUsers",
                keyColumn: "UserId",
                keyValue: 11,
                column: "Talent",
                value: "AI devlopper");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Talent",
                table: "TalentUsers");
        }
    }
}
