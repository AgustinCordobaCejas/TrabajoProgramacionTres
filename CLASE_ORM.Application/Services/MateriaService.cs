using CLASE_ORM.Entities;
using CLASE_ORM.Entities.DTO.Materia;
using CLASE_ORM.Interfaces;

namespace CLASE_ORM.Services;

public sealed class MateriaService(IMateriaRepository repository) : IMateriaService
{
    public async Task<PagedResult<MateriaDto>> GetPageAsync(string? filter, int page, int pageSize)
    {
        var result = await repository.GetPageAsync(filter, page, pageSize);
        var items = result.Items.Select(ToDto).ToList();
        return new PagedResult<MateriaDto>(items, result.Page, result.PageSize, result.TotalCount);
    }

    public async Task<MateriaDto> GetByIdAsync(int id)
    {
        var materia = await repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No existe una materia con ID {id}.");
        return ToDto(materia);
    }

    public async Task<MateriaDto> CreateAsync(CrearMateriaDto dto)
    {
        var materia = new Materia { Nombre = dto.Nombre.Trim() };
        await repository.AddAsync(materia);
        await repository.SaveChangesAsync();
        return ToDto(materia);
    }

    public async Task UpdateAsync(int id, ActualizarMateriaDto dto)
    {
        var materia = await repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No existe una materia con ID {id}.");
        materia.Nombre = dto.Nombre.Trim();
        await repository.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var materia = await repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No existe una materia con ID {id}.");
        repository.Remove(materia);
        await repository.SaveChangesAsync();
    }

    private static MateriaDto ToDto(Materia materia) => new()
    {
        Id = materia.Id,
        Nombre = materia.Nombre
    };
}
