using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class K : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          migrationBuilder.AddColumn<string>(
         name: "ImageDataToUse",
         table: "TalentUsers",
         nullable: true);

            migrationBuilder.AddColumn<string>(
            name: "ImageName",
            table: "TalentUsers",
            nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
          name: "ImageData",
          table: "TalentUsers",
          nullable: true);
        }
    }
}
