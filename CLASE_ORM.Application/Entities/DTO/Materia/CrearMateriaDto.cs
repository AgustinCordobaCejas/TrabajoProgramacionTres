namespace CLASE_ORM.Entities.DTO.Materia
{
    public class CrearMateriaDto
    {
        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.StringLength(100, MinimumLength = 2)]
        public string Nombre { get; set; } = string.Empty;
    }
}
