using CLASE_ORM.Context;
using CLASE_ORM.Infrastructure.Repositories;
using CLASE_ORM.Infrastructure.Security;
using CLASE_ORM.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CLASE_ORM.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Con")
            ?? throw new InvalidOperationException("Falta configurar ConnectionStrings:Con.");

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString, sql => sql.MigrationsAssembly("CLASE_ORM")));
        services.AddScoped<IAlumnoRepository, AlumnoRepository>();
        services.AddScoped<IMateriaRepository, MateriaRepository>();
        services.AddScoped<IUsuarioRepository, UsuarioRepository>();
        services.AddScoped<IPasswordHasher, BcryptPasswordHasher>();
        services.AddScoped<ITokenService, JwtTokenService>();
        services.AddScoped<IAdminBootstrapper, AdminBootstrapper>();
        return services;
    }
}
