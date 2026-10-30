using CLASE_ORM.Entities.DTO.Materia;
using CLASE_ORM.Services;

namespace CLASE_ORM.Interfaces;

public interface IMateriaService
{
    Task<PagedResult<MateriaDto>> GetPageAsync(string? filter, int page, int pageSize);
    Task<MateriaDto> GetByIdAsync(int id);
    Task<MateriaDto> CreateAsync(CrearMateriaDto dto);
    Task UpdateAsync(int id, ActualizarMateriaDto dto);
    Task DeleteAsync(int id);
}
