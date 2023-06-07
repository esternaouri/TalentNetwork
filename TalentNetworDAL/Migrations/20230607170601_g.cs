using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class g : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Faqs_Users",
                table: "Faqs");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectsForTalents_Users",
                table: "ProjectsForTalents");

            migrationBuilder.DropForeignKey(
                name: "FK_TalentUsers_Users",
                table: "TalentUsers");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageDataByte",
                table: "TalentUsers",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "TalentUsers",
                keyColumn: "UserId",
                keyValue: 1,
                column: "ImageDataByte",
                value: null);

            migrationBuilder.UpdateData(
                table: "TalentUsers",
                keyColumn: "UserId",
                keyValue: 11,
                column: "ImageDataByte",
                value: null);

            migrationBuilder.AddForeignKey(
                name: "FK_Faqs_Users",
                table: "Faqs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectsForTalents_Users",
                table: "ProjectsForTalents",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TalentUsers_Users",
                table: "TalentUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Faqs_Users",
                table: "Faqs");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectsForTalents_Users",
                table: "ProjectsForTalents");

            migrationBuilder.DropForeignKey(
                name: "FK_TalentUsers_Users",
                table: "TalentUsers");

            migrationBuilder.DropColumn(
                name: "ImageDataByte",
                table: "TalentUsers");

            migrationBuilder.AddForeignKey(
                name: "FK_Faqs_Users",
                table: "Faqs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectsForTalents_Users",
                table: "ProjectsForTalents",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TalentUsers_Users",
                table: "TalentUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
