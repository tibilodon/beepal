using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class modify_orderdata_model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderData_Address_AddressId",
                table: "OrderData");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderData_AspNetUsers_AppUserId",
                table: "OrderData");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_OrderData_OrderDataId",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_OrderDataId",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderData",
                table: "OrderData");

            migrationBuilder.DropColumn(
                name: "OrderDataId",
                table: "Product");

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "OrderData",
                newName: "OrderDatas");

            migrationBuilder.RenameIndex(
                name: "IX_OrderData_AppUserId",
                table: "OrderDatas",
                newName: "IX_OrderDatas_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderData_AddressId",
                table: "OrderDatas",
                newName: "IX_OrderDatas_AddressId");

            migrationBuilder.AddColumn<string>(
                name: "ProductId",
                table: "OrderDatas",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDatas",
                table: "OrderDatas",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDatas_ProductId",
                table: "OrderDatas",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDatas_Address_AddressId",
                table: "OrderDatas",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDatas_AspNetUsers_AppUserId",
                table: "OrderDatas",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDatas_Products_ProductId",
                table: "OrderDatas",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDatas_Address_AddressId",
                table: "OrderDatas");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDatas_AspNetUsers_AppUserId",
                table: "OrderDatas");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDatas_Products_ProductId",
                table: "OrderDatas");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDatas",
                table: "OrderDatas");

            migrationBuilder.DropIndex(
                name: "IX_OrderDatas_ProductId",
                table: "OrderDatas");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "OrderDatas");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Product");

            migrationBuilder.RenameTable(
                name: "OrderDatas",
                newName: "OrderData");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDatas_AppUserId",
                table: "OrderData",
                newName: "IX_OrderData_AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDatas_AddressId",
                table: "OrderData",
                newName: "IX_OrderData_AddressId");

            migrationBuilder.AddColumn<string>(
                name: "OrderDataId",
                table: "Product",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderData",
                table: "OrderData",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_OrderDataId",
                table: "Product",
                column: "OrderDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderData_Address_AddressId",
                table: "OrderData",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderData_AspNetUsers_AppUserId",
                table: "OrderData",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_OrderData_OrderDataId",
                table: "Product",
                column: "OrderDataId",
                principalTable: "OrderData",
                principalColumn: "Id");
        }
    }
}
