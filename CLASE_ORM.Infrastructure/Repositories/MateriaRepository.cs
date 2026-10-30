using CLASE_ORM.Context;
using CLASE_ORM.Entities;
using CLASE_ORM.Interfaces;
using CLASE_ORM.Services;
using Microsoft.EntityFrameworkCore;

namespace CLASE_ORM.Infrastructure.Repositories;

public sealed class MateriaRepository(AppDbContext context) : IMateriaRepository
{
    public async Task<PagedResult<Materia>> GetPageAsync(string? filter, int page, int pageSize)
    {
        var query = context.Materias.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(filter))
        {
            var term = filter.Trim();
            query = query.Where(materia => materia.Nombre.Contains(term));
        }

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(materia => materia.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return new PagedResult<Materia>(items, page, pageSize, totalCount);
    }

    public Task<Materia?> GetByIdAsync(int id) =>
        context.Materias.FirstOrDefaultAsync(materia => materia.Id == id);

    public Task AddAsync(Materia materia) => context.Materias.AddAsync(materia).AsTask();

    public Task SaveChangesAsync() => context.SaveChangesAsync();

    public void Remove(Materia materia) => context.Materias.Remove(materia);
}
