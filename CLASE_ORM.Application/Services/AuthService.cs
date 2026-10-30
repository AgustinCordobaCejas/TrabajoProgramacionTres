using CLASE_ORM.Entities;
using CLASE_ORM.Entities.DTO.Login;
using CLASE_ORM.Interfaces;

namespace CLASE_ORM.Services;

public sealed class AuthService(
    IUsuarioRepository usuarioRepository,
    IPasswordHasher passwordHasher,
    ITokenService tokenService) : IAuthService
{
    public async Task RegisterAsync(RegisterDto dto)
    {
        var email = dto.Email.Trim();
        if (await usuarioRepository.ExistsByEmailAsync(email))
        {
            throw new ConflictException("Ya existe una cuenta registrada con ese email.");
        }

        await usuarioRepository.AddAsync(new Usuario
        {
            Nombre = dto.Nombre.Trim(),
            Email = email,
            PasswordHas = passwordHasher.Hash(dto.Password),
            Rol = "User"
        });
        await usuarioRepository.SaveChangesAsync();
    }

    public async Task<string?> LoginAsync(LoginDto dto)
    {
        var user = await usuarioRepository.GetByEmailAsync(dto.Email.Trim());
        if (user is null || !passwordHasher.Verify(dto.Password, user.PasswordHas))
        {
            return null;
        }

        return tokenService.Generate(user);
    }
}
