namespace backend.DTOs
{
    public class CreditoCreateDTO
    {
        public decimal Monto { get; set; }
        public int Plazo { get; set; }
        public decimal TasaInteres { get; set; }
        public decimal IngresoMensual { get; set; }
        public int AntiguedadLaboral { get; set; }
        public string RelacionDependencia { get; set; }
        public string Motivo { get; set; }
    }
}
