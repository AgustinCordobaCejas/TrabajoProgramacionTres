namespace CLASE_ORM.Entities.DTO.Alumno
{
    public class AlumnoDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Materia { get; set; } = string.Empty;
        public int MateriaId { get; set; }
        public string Email {get;set; } = string.Empty;
    }
}
