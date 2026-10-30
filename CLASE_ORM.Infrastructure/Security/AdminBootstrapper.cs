using CLASE_ORM.Entities;
using CLASE_ORM.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CLASE_ORM.Infrastructure.Security;

public sealed class AdminBootstrapper(
    IConfiguration configuration,
    IUsuarioRepository usuarioRepository,
    IPasswordHasher passwordHasher,
    ILogger<AdminBootstrapper> logger) : IAdminBootstrapper
{
    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        var email = configuration["AdminBootstrap:Email"];
        var name = configuration["AdminBootstrap:Name"];
        var password = configuration["AdminBootstrap:Password"];
        var configuredValues = new[] { email, name, password };

        if (configuredValues.All(string.IsNullOrWhiteSpace))
        {
            logger.LogWarning(
                "No se configuró una cuenta Admin inicial. Defina AdminBootstrap:Email, AdminBootstrap:Name y AdminBootstrap:Password para aprovisionarla.");
            return;
        }

        if (configuredValues.Any(string.IsNullOrWhiteSpace))
        {
            throw new InvalidOperationException(
                "La configuración inicial de Admin está incompleta. Defina Email, Name y Password.");
        }
        if (password!.Length < 12)
        {
            throw new InvalidOperationException(
                "AdminBootstrap:Password debe tener al menos 12 caracteres.");
        }

        var admin = await usuarioRepository.GetByEmailAsync(email!.Trim());
        if (admin is null)
        {
            admin = new Usuario
            {
                Nombre = name!.Trim(),
                Email = email.Trim(),
                PasswordHas = passwordHasher.Hash(password),
                Rol = "Admin"
            };
            await usuarioRepository.AddAsync(admin);
        }
        else
        {
            admin.Nombre = name!.Trim();
            admin.Rol = "Admin";
            admin.PasswordHas = passwordHasher.Hash(password);
        }

        await usuarioRepository.SaveChangesAsync();
        logger.LogInformation("La cuenta de administrador configurada está disponible.");
    }
}
