using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class _88 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 1,
                column: "Question",
                value: "How-long does it take to fins project? ");

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 2,
                column: "Question",
                value: "How--much experience do you have?");

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 3,
                column: "Question",
                value: "How-long does it take to finsh projec? ");

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 4,
                column: "Question",
                value: "Ho-long does it take to finsh projec? ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 1,
                column: "Question",
                value: "How --long does it take to fins project? ");

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 2,
                column: "Question",
                value: "How ---much experience do you have?");

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 3,
                column: "Question",
                value: "How --long does it take to finsh projec? ");

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 4,
                column: "Question",
                value: "How --long does it take to finsh projec? ");
        }
    }
}
