using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalentNetworDAL.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 1,
                columns: new[] { "Answer", "Question" },
                values: new object[] { "4 weeks", "How long does it take to fins project? " });

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 2,

                columns: new[] { "Answer", "Question" },
                values: new object[] { "7 years", "How much experience do you have?" });

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 3,
                columns: new[] { "Answer", "Question" },
                values: new object[] { "8 weeks", "How long does it take to finsh projec? " });

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 4,
                columns: new[] { "Answer", "Question" },
                values: new object[] { "17 years", "How long does it take to finsh projec? " });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 1,
                columns: new[] { "Answer", "Question" },
                values: new object[] { "2 weeks", "How long does it take to finsh project? " });

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 2,
                columns: new[] { "Answer", "Question" },
                values: new object[] { "2 years", "How much experience do you have? " });

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 3,
                columns: new[] { "Answer", "Question" },
                values: new object[] { "4 weeks", "How long does it take to finsh project? " });

            migrationBuilder.UpdateData(
                table: "Faqs",
                keyColumn: "FaqID",
                keyValue: 4,
                columns: new[] { "Answer", "Question" },
                values: new object[] { "2 years", "How long does it take to finsh project? " });
        }
    }
}
