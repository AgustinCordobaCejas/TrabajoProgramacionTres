using CLASE_ORM.Entities;

namespace CLASE_ORM.Interfaces;

public interface IUsuarioRepository
{
    Task<bool> ExistsByEmailAsync(string email);
    Task<Usuario?> GetByEmailAsync(string email);
    Task AddAsync(Usuario usuario);
    Task SaveChangesAsync();
}
