using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Credito
    {
        [Key]
        public int IdCredito { get; set; }
        [Required]
        public decimal Monto { get; set; }
        [Required]
        public int Plazo { get; set; }
        [Required]
        public decimal TazaInteres { get; set; }
        [Required]
        public decimal IngresoMensual { get; set; }
        [Required]
        public int AntiguedadLaboral { get; set; }
        public string RelacionDependencia { get; set; } = null!;
        public string Estado { get; set; } = "PENDIENTE";
        public DateTime FechaSolicitud { get; set; } = DateTime.UtcNow;
        //Fk
        public int UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }
    }
}
