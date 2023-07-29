using Microsoft.EntityFrameworkCore;
using TalentNetworDAL.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;


namespace TalentNetwork.BACK
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllersWithViews();
            var TalentNetworkCS = builder.Configuration.GetConnectionString("TalentNetwork");

            int expiresInSeconds = int.Parse(builder.Configuration.GetSection("Jwt:ExpiresInSeconds").Value);
            string key = builder.Configuration.GetSection("Jwt:Key").Value;
            string issuer = builder.Configuration.GetSection("Jwt:Issuer").Value;
            string audience = builder.Configuration.GetSection("Jwt:Audience").Value;

            builder.Services.AddDbContext<TalentNetworkContext>(cfg => cfg.UseSqlServer(TalentNetworkCS));
            builder.Services.AddLogging(configure => configure.AddConsole());
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddCors(sa =>
            {
                sa.AddDefaultPolicy(pol =>
                {
                    pol.AllowAnyHeader();
                    pol.AllowAnyMethod();
                    pol.AllowAnyOrigin();
                });
            });
            builder.Services.AddSingleton(new TokensManager()
            {
                Issuer = issuer,
                Audience = audience,
                ExpiresInSeconds = expiresInSeconds,
                Key = key
            });
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    IssuerSigningKey = new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes(key)),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidateIssuerSigningKey = true
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}