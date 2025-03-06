using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Timesheetentityupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_timesheets_UserInformation_UserInformationId",
                table: "timesheets");

            migrationBuilder.DropIndex(
                name: "IX_timesheets_UserInformationId",
                table: "timesheets");

            migrationBuilder.RenameColumn(
                name: "UserInformationId",
                table: "timesheets",
                newName: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "timesheets",
                newName: "UserInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_timesheets_UserInformationId",
                table: "timesheets",
                column: "UserInformationId");

            migrationBuilder.AddForeignKey(
                name: "FK_timesheets_UserInformation_UserInformationId",
                table: "timesheets",
                column: "UserInformationId",
                principalTable: "UserInformation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
