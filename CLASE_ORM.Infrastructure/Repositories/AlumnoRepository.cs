using CLASE_ORM.Context;
using CLASE_ORM.Entities;
using CLASE_ORM.Interfaces;
using CLASE_ORM.Services;
using Microsoft.EntityFrameworkCore;

namespace CLASE_ORM.Infrastructure.Repositories;

public sealed class AlumnoRepository(AppDbContext context) : IAlumnoRepository
{
    public async Task<PagedResult<Alumno>> GetPageAsync(string? filter, int page, int pageSize)
    {
        var query = context.Alumnos.Include(alumno => alumno.Materia).AsNoTracking();
        if (!string.IsNullOrWhiteSpace(filter))
        {
            var term = filter.Trim();
            query = query.Where(alumno =>
                alumno.Nombre.Contains(term) ||
                alumno.Email.Contains(term) ||
                alumno.Materia.Nombre.Contains(term));
        }

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(alumno => alumno.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return new PagedResult<Alumno>(items, page, pageSize, totalCount);
    }

    public Task<Alumno?> GetByIdAsync(int id) =>
        context.Alumnos.Include(alumno => alumno.Materia)
            .FirstOrDefaultAsync(alumno => alumno.Id == id);

    public Task<bool> MateriaExistsAsync(int materiaId) =>
        context.Materias.AnyAsync(materia => materia.Id == materiaId);

    public Task AddAsync(Alumno alumno) => context.Alumnos.AddAsync(alumno).AsTask();

    public Task SaveChangesAsync() => context.SaveChangesAsync();

    public void Remove(Alumno alumno) => context.Alumnos.Remove(alumno);
}
