using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class TimesheetinTimeentrychangedbyTimesheetId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_timeEntries_timesheets_TimesheetId",
                table: "timeEntries");

            migrationBuilder.DropIndex(
                name: "IX_timeEntries_TimesheetId",
                table: "timeEntries");

            migrationBuilder.AlterColumn<string>(
                name: "TimesheetId",
                table: "timeEntries",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "TimesheetId",
                table: "timeEntries",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_timeEntries_TimesheetId",
                table: "timeEntries",
                column: "TimesheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_timeEntries_timesheets_TimesheetId",
                table: "timeEntries",
                column: "TimesheetId",
                principalTable: "timesheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
