dotnet add package Microsoft.AspNetCore.Session
dotnet add package Microsoft.Extensions.Caching.SqlServer
dotnet add package Microsoft.AspNetCore.Authentication.OpenIdConnect
dotnet add package Microsoft.IdentityModel.Protocols.OpenIdConnect


IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'SessionData')
BEGIN
    CREATE TABLE SessionData (
        Id NVARCHAR(449) NOT NULL PRIMARY KEY,
        Value VARBINARY(MAX) NOT NULL,
        ExpiresAtTime DATETIMEOFFSET NOT NULL,
        SlidingExpirationInSeconds BIGINT NULL,
        AbsoluteExpiration DATETIMEOFFSET NULL
    );
END;






using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.Caching.SqlServer;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Configure SQL Server distributed cache
        services.AddDistributedSqlServerCache(options =>
        {
            options.ConnectionString = Configuration.GetConnectionString("DefaultConnection");
            options.SchemaName = "dbo";
            options.TableName = "SessionData";
        });

        // Configure session options
        services.AddSession(options =>
        {
            options.IdleTimeout = TimeSpan.FromMinutes(30); // Set the session timeout
            options.Cookie.HttpOnly = true;
            options.Cookie.IsEssential = true;
        });

        // Configure OpenID Connect authentication
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = OpenIdConnectDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        })
        .AddOpenIdConnect(options =>
        {
            options.Authority = Configuration["OpenIdConnect:Authority"];
            options.ClientId = Configuration["OpenIdConnect:ClientId"];
            options.ClientSecret = Configuration["OpenIdConnect:ClientSecret"];
            options.ResponseType = OpenIdConnectResponseType.Code;
            options.SaveTokens = true;
            options.CallbackPath = Configuration["OpenIdConnect:CallbackPath"];
            options.TokenValidationParameters = new TokenValidationParameters
            {
                NameClaimType = "name",
                RoleClaimType = "role"
            };
        });

        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseSession(); // Enable session middleware

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}




