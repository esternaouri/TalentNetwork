using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class _11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 5,
                columns: new[] { "Answer", "Question", "UserId" },
                values: new object[] { "7 years", "How--much experience do you have?", 1 });

            migrationBuilder.InsertData(
                table: "Faqs",
                columns: new[] { "FaqID", "Answer", "Question", "UserId" },
                values: new object[,]
                {
                    { 6, "8 weeks", "How-long does it take to finsh projec? ", 11 },
                    { 7, "17 years", "Ho-long does it take to finsh projec? ", 11 },
                    { 15, "4 weeks", "How-long does it take to fins project? ", 1 },
                    { 59, "17 years", "Ho-long finsh projec? ", 11 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 59);

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 5,
                columns: new[] { "Answer", "Question", "UserId" },
                values: new object[] { "17 years", "Ho-long finsh projec? ", 11 });

            migrationBuilder.InsertData(
                table: "Faqs",
                columns: new[] { "FaqID", "Answer", "Question", "UserId" },
                values: new object[,]
                {
                    { 1, "4 weeks", "How-long does it take to fins project? ", 1 },
                    { 2, "7 years", "How--much experience do you have?", 1 },
                    { 3, "8 weeks", "How-long does it take to finsh projec? ", 11 },
                    { 4, "17 years", "Ho-long does it take to finsh projec? ", 11 }
                });
        }
    }
}
