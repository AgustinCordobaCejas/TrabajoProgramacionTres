using CLASE_ORM.Entities;
using CLASE_ORM.Services;

namespace CLASE_ORM.Interfaces;

public interface IMateriaRepository
{
    Task<PagedResult<Materia>> GetPageAsync(string? filter, int page, int pageSize);
    Task<Materia?> GetByIdAsync(int id);
    Task AddAsync(Materia materia);
    Task SaveChangesAsync();
    void Remove(Materia materia);
}
