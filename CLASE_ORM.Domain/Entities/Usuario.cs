namespace CLASE_ORM.Entities
{
    public class Usuario
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHas { get; set; } = string.Empty;

        public string Rol { get; set; } = "User";
    }
}