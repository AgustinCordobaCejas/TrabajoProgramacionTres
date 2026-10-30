namespace CLASE_ORM.Entities.DTO.Alumno
{
    public class ActualizarAlumnoDto
    {
        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.StringLength(100, MinimumLength = 2)]
        public string Nombre { get; set; } = string.Empty;

        [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue)]
        public int MateriaId { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.EmailAddress]
        [System.ComponentModel.DataAnnotations.StringLength(200)]
        public string Email { get; set; } = string.Empty;
    }
}
