using CLASE_ORM.Entities;
using CLASE_ORM.Services;

namespace CLASE_ORM.Interfaces;

public interface IAlumnoRepository
{
    Task<PagedResult<Alumno>> GetPageAsync(string? filter, int page, int pageSize);
    Task<Alumno?> GetByIdAsync(int id);
    Task<bool> MateriaExistsAsync(int materiaId);
    Task AddAsync(Alumno alumno);
    Task SaveChangesAsync();
    void Remove(Alumno alumno);
}
