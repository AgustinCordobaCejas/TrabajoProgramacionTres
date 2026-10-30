namespace CLASE_ORM.Entities
{
    public class Materia
    {
        public int Id { get; set; } 
        public string Nombre { get; set; } = string.Empty;
        
        //AGREGAMOS LA NAVEGACIÓN INVERSA
        public List<Alumno> Alumnos { get; set; } = [];
    }
}
