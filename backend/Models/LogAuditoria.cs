using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class LogAuditoria
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; } = null!;
        [Required]
        public string Accion { get; set; } = null!;
        public string? Detalle { get; set; }
        public DateTime Fecha { get; set; } = DateTime.UtcNow;
    }
}
