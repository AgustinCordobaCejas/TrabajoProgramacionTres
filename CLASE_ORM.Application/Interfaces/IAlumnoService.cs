using CLASE_ORM.Entities;
using CLASE_ORM.Entities.DTO.Alumno;
using CLASE_ORM.Services;

namespace CLASE_ORM.Interfaces;

public interface IAlumnoService
{
    Task<PagedResult<AlumnoDto>> GetPageAsync(string? filter, int page, int pageSize);
    Task<AlumnoDto> GetByIdAsync(int id);
    Task<AlumnoDto> CreateAsync(CrearAlumnoDto dto);
    Task UpdateAsync(int id, ActualizarAlumnoDto dto);
    Task DeleteAsync(int id);
}
