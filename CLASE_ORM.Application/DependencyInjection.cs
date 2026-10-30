using CLASE_ORM.Interfaces;
using CLASE_ORM.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CLASE_ORM.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAlumnoService, AlumnoService>();
        services.AddScoped<IMateriaService, MateriaService>();
        services.AddScoped<IAuthService, AuthService>();
        return services;
    }
}
