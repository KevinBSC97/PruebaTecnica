using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        [Required]
        public string Identificacion { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Apellido { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
        [Required]
        public string Rol { get; set; } = "SOLICITANTE";
        //Relación: un usuario puede tener muchas solicitudes
        public ICollection<Credito> Creditos { get; set; } = new List<Credito>();
    }
}
