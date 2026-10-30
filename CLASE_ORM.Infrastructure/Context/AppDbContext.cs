using CLASE_ORM.Entities;
using Microsoft.EntityFrameworkCore;

namespace CLASE_ORM.Context
{
    public class AppDbContext : DbContext
    {
        
        // AppDbContext - AplicationDbContext 

        public AppDbContext(DbContextOptions<AppDbContext> options): base (options)
        {
            
        }
        
        // add-migration, update-database, remove-migration, drop-database.

        public DbSet<Alumno> Alumnos { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<Profesor> Profesores { get; set; }
        public DbSet<Usuario> Usuario { get; set; }



    }
}
