using System.Security.Claims;
using AspNetChat.Global;
using AspNetChat.Messages;
using AspNetChat.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var dbConnectionString = builder.Configuration.GetConnectionString("Database");
if (dbConnectionString == null) throw new Exception("No db connection string");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(dbConnectionString);
});

var redisHost = builder.Configuration["Redis:Host"];
var redisUser = builder.Configuration["Redis:User"];
var redisPassword = builder.Configuration["Redis:Password"];
if (
    redisHost == null ||
    redisUser == null ||
    redisPassword == null
) throw new Exception("Missing redis connection");
builder.Services
    .AddSignalR()
    .AddStackExchangeRedis(redisHost, options =>
    {
        options.Configuration.User = redisUser;
        options.Configuration.Password = redisPassword;
        options.Configuration.ChannelPrefix = RedisChannel.Literal("SIGNALR_BACKPLANE");
    });

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

app.MapHub<MessageHub>("/hubs/messages");

app.MapGroup("auth").MapIdentityApi<ApplicationUser>().WithTags(["Auth"]);

app.Run();
