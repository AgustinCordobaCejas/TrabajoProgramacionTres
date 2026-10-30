using CLASE_ORM.Context;
using CLASE_ORM.Entities;
using CLASE_ORM.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CLASE_ORM.Infrastructure.Repositories;

public sealed class UsuarioRepository(AppDbContext context) : IUsuarioRepository
{
    public Task<bool> ExistsByEmailAsync(string email) =>
        context.Usuario.AnyAsync(usuario => usuario.Email == email);

    public Task<Usuario?> GetByEmailAsync(string email) =>
        context.Usuario.FirstOrDefaultAsync(usuario => usuario.Email == email);

    public Task AddAsync(Usuario usuario) => context.Usuario.AddAsync(usuario).AsTask();

    public Task SaveChangesAsync() => context.SaveChangesAsync();
}
