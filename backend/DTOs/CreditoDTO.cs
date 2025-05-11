namespace backend.DTOs
{
    public class CreditoDTO
    {
        public int IdCredito { get; set; }
        public decimal Monto { get; set; }
        public int Plazo { get; set; }
        public decimal TasaInteres { get; set; }
        public decimal IngresoMensual { get; set; }
        public int AntiguedadLaboral { get; set; }
        public string RelacionDependencia { get; set; }
        public string Estado { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public decimal CuotaMensual { get; set; }
        public decimal TotalPagar { get; set; }

        public UsuarioDTO Usuario { get; set; }
    }
}
