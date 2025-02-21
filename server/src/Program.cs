using AspNetChat.Global;
using AspNetChat.Messages;
using AspNetChat.Users;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var dbConnectionString = builder.Configuration.GetConnectionString("Database");
if (dbConnectionString == null) throw new Exception("No db connection string");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(dbConnectionString);
});

var redisConnectionString = builder.Configuration.GetConnectionString("Redis");
if (redisConnectionString == null) throw new Exception("No redis connection string");
builder.Services
    .AddSignalR()
    .AddStackExchangeRedis(redisConnectionString);

builder.Services
    .AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services
.AddAuthorization(options =>
{
    options.AddPolicy("RequireCompletedProfile", (policy) =>
    {
        policy.RequireClaim("PorfileCompleted");
    });
});


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<MessageHub>("/messages/hub");

app.MapGroup("auth").MapIdentityApi<ApplicationUser>().WithTags(["Auth"]);

app.Run();
