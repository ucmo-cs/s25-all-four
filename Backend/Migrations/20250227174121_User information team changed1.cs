using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Userinformationteamchanged1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInformation_teams_TeamId",
                table: "UserInformation");

            migrationBuilder.DropIndex(
                name: "IX_UserInformation_TeamId",
                table: "UserInformation");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "UserInformation");

            migrationBuilder.AddColumn<string>(
                name: "Team",
                table: "UserInformation",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Team",
                table: "UserInformation");

            migrationBuilder.AddColumn<Guid>(
                name: "TeamId",
                table: "UserInformation",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserInformation_TeamId",
                table: "UserInformation",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInformation_teams_TeamId",
                table: "UserInformation",
                column: "TeamId",
                principalTable: "teams",
                principalColumn: "Id");
        }
    }
}
