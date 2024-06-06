using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Helpers;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;
using ReactApp1.Server.Repository;
using ReactApp1.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//   Configure the EF Core context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//  Add Identity services to the container
builder.Services.AddAuthorization();

builder.Services.AddIdentity<AppUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
builder.Services.AddMemoryCache();
//builder.Services.AddSession();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.SignIn.RequireConfirmedEmail = true;
});

builder.Services.Configure<GSMTPSettings>(builder.Configuration.GetSection("GSMTPSettings"));
builder.Services.AddSingleton<IEmailSender<AppUser>, EmailSender>();



builder.Services.AddControllers();

builder.Services.AddScoped<ICookieRepository, CookieRepository>();
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

//  Map Identity routes
app.MapIdentityApi<AppUser>();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
