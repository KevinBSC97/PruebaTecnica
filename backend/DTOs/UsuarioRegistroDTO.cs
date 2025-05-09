namespace backend.DTOs
{
    public class UsuarioRegistroDTO
    {
        public string Identifiacion { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
