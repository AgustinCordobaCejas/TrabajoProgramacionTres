using CLASE_ORM.Entities;
using CLASE_ORM.Entities.DTO.Alumno;
using CLASE_ORM.Interfaces;

namespace CLASE_ORM.Services;

public sealed class AlumnoService(IAlumnoRepository repository) : IAlumnoService
{
    public async Task<PagedResult<AlumnoDto>> GetPageAsync(string? filter, int page, int pageSize)
    {
        var result = await repository.GetPageAsync(filter, page, pageSize);
        var items = result.Items.Select(ToDto).ToList();
        return new PagedResult<AlumnoDto>(items, result.Page, result.PageSize, result.TotalCount);
    }

    public async Task<AlumnoDto> GetByIdAsync(int id)
    {
        var alumno = await repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No existe un alumno con ID {id}.");
        return ToDto(alumno);
    }

    public async Task<AlumnoDto> CreateAsync(CrearAlumnoDto dto)
    {
        if (!await repository.MateriaExistsAsync(dto.MateriaId))
        {
            throw new NotFoundException($"No existe una materia con ID {dto.MateriaId}.");
        }

        var alumno = new Alumno
        {
            Nombre = dto.Nombre.Trim(),
            Email = dto.Email.Trim(),
            MateriaId = dto.MateriaId
        };

        await repository.AddAsync(alumno);
        await repository.SaveChangesAsync();
        return ToDto((await repository.GetByIdAsync(alumno.Id))!);
    }

    public async Task UpdateAsync(int id, ActualizarAlumnoDto dto)
    {
        var alumno = await repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No existe un alumno con ID {id}.");
        if (!await repository.MateriaExistsAsync(dto.MateriaId))
        {
            throw new NotFoundException($"No existe una materia con ID {dto.MateriaId}.");
        }

        alumno.Nombre = dto.Nombre.Trim();
        alumno.Email = dto.Email.Trim();
        alumno.MateriaId = dto.MateriaId;
        await repository.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var alumno = await repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"No existe un alumno con ID {id}.");
        repository.Remove(alumno);
        await repository.SaveChangesAsync();
    }

    private static AlumnoDto ToDto(Alumno alumno) => new()
    {
        Id = alumno.Id,
        Nombre = alumno.Nombre,
        Email = alumno.Email,
        Materia = alumno.Materia.Nombre,
        MateriaId = alumno.MateriaId
    };
}
