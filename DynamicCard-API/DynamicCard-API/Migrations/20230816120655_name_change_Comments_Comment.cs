using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DynamicCard_API.Migrations
{
    public partial class name_change_Comments_Comment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Comments",
                table: "DynamicCards",
                newName: "Comment");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "DynamicCards",
                newName: "Comments");
        }
    }
}
