using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Fixingbacked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_timeEntries_timesheets_TimeSheetId",
                table: "timeEntries");

            migrationBuilder.RenameColumn(
                name: "TimeSheetId",
                table: "timeEntries",
                newName: "TimesheetId");

            migrationBuilder.RenameIndex(
                name: "IX_timeEntries_TimeSheetId",
                table: "timeEntries",
                newName: "IX_timeEntries_TimesheetId");

            migrationBuilder.AlterColumn<int>(
                name: "HoursWorked",
                table: "timeEntries",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<int>(
                name: "TimesheetEntryId",
                table: "timeEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_timeEntries_timesheets_TimesheetId",
                table: "timeEntries",
                column: "TimesheetId",
                principalTable: "timesheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_timeEntries_timesheets_TimesheetId",
                table: "timeEntries");

            migrationBuilder.DropColumn(
                name: "TimesheetEntryId",
                table: "timeEntries");

            migrationBuilder.RenameColumn(
                name: "TimesheetId",
                table: "timeEntries",
                newName: "TimeSheetId");

            migrationBuilder.RenameIndex(
                name: "IX_timeEntries_TimesheetId",
                table: "timeEntries",
                newName: "IX_timeEntries_TimeSheetId");

            migrationBuilder.AlterColumn<double>(
                name: "HoursWorked",
                table: "timeEntries",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_timeEntries_timesheets_TimeSheetId",
                table: "timeEntries",
                column: "TimeSheetId",
                principalTable: "timesheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
