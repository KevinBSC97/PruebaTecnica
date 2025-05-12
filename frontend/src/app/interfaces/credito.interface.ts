export interface Credito {
  idCredito: number;
  monto: number;
  plazo: number;
  tasaInteres: number;
  ingresoMensual: number;
  antiguedadLaboral: number;
  relacionDependencia: string;
  estado: string;
  motivo: string;
  estadoSugerido: string;
  fechaSolicitud: string;
  cuotaMensual: number;
  totalPagar: number;
  usuario: {
    idUsuario: number;
    nombre: string;
    apellido: string;
    email: string;
  };
}
