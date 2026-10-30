using CLASE_ORM.Entities.DTO.Login;

namespace CLASE_ORM.Interfaces;

public interface IAuthService
{
    Task RegisterAsync(RegisterDto dto);
    Task<string?> LoginAsync(LoginDto dto);
}
