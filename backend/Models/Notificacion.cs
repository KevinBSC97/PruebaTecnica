using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Notificacion
    {
        [Key]
        public int NotificacionId { get; set; }
        [Required]
        public int UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }
        public int? CreditoId { get; set; }
        [ForeignKey("CreditoId")]
        public Credito? Credito { get; set; }
        [Required]
        public string Mensaje { get; set; } = null!;
        public DateTime Fecha { get; set; } = DateTime.UtcNow;
        public bool Leida { get; set; } = false;
    }
}
