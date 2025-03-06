using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Timesheetandtimeentry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "timesheets");

            migrationBuilder.DropColumn(
                name: "TimesheetEntryId",
                table: "timeEntries");

            migrationBuilder.AddColumn<Guid>(
                name: "UserInformationId",
                table: "timesheets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_timesheets_UserInformation_UserInformationId",
                table: "timesheets");

            migrationBuilder.DropIndex(
                name: "IX_timesheets_UserInformationId",
                table: "timesheets");

            migrationBuilder.DropColumn(
                name: "UserInformationId",
                table: "timesheets");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "timesheets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TimesheetEntryId",
                table: "timeEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
