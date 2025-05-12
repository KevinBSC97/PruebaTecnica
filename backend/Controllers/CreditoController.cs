using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Authorize(Roles = "ANALISTA")]
    [ApiController]
    [Route("api/[controller]")]
    public class CreditoController : Controller
    {
        private readonly ICreditoRepository _creditoRepo;
        private readonly ILogAuditoriaRepository _logRepo;
        private readonly INotificacionRepository _notificacionRepo;
        public CreditoController(ICreditoRepository creditoRepo, ILogAuditoriaRepository logRepo, INotificacionRepository notificacionRepo)
        {
            _creditoRepo = creditoRepo;
            _logRepo = logRepo;
            _notificacionRepo = notificacionRepo;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodas([FromBody] string? estado)
        {
            var solicitudes = await _creditoRepo.GetAllAsync();

            var result = solicitudes.Select(s => new CreditoDTO
            {
                IdCredito = s.IdCredito,
                Monto = s.Monto,
                Plazo = s.Plazo,
                TasaInteres = s.TasaInteres,
                IngresoMensual = s.IngresoMensual,
                AntiguedadLaboral = s.AntiguedadLaboral,
                RelacionDependencia = s.RelacionDependencia,
                Estado = s.Estado,
                FechaSolicitud = s.FechaSolicitud,
                CuotaMensual = s.CuotaMensual,
                TotalPagar = s.TotalPagar,
                Usuario = new UsuarioDTO
                {
                    IdUsuario = s.Usuario.IdUsuario,
                    Nombre = s.Usuario.Nombre,
                    Apellido = s.Usuario.Apellido,
                    Email = s.Usuario.Email
                }
            }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerDetalle(int id)
        {
            var solicitud = await _creditoRepo.GetByIdAsync(id);

            if (solicitud == null)
                return NotFound("Solicitud no encontrada");

            var estadoSugerido = solicitud.IngresoMensual >= 1500 ? "APROBADO" : "PENDIENTE";

            var dto = new
            {
                IdCredito = solicitud.IdCredito,
                Monto = solicitud.Monto,
                Plazo = solicitud.Plazo,
                TasaInteres = solicitud.TasaInteres,
                IngresoMensual = solicitud.IngresoMensual,
                AntiguedadLaboral = solicitud.AntiguedadLaboral,
                RelacionDependencia = solicitud.RelacionDependencia,
                Estado = solicitud.Estado,
                Motivo = solicitud.Motivo,
                FechaSolicitud = solicitud.FechaSolicitud,
                CuotaMensual = solicitud.CuotaMensual,
                TotalPagar = solicitud.TotalPagar,
                EstadoSugerido = estadoSugerido,
                Usuario = new
                {
                    solicitud.Usuario.IdUsuario,
                    solicitud.Usuario.Nombre,
                    solicitud.Usuario.Apellido,
                    solicitud.Usuario.Email
                }
            };

            return Ok(dto);
        }

        [HttpPut("{id}/estado")]
        [Authorize(Roles = "ANALISTA")]
        public async Task<IActionResult> CambiarEstado(int id, [FromBody] CambioEstadoDTO dto)
        {
            var solicitud = await _creditoRepo.GetByIdAsync(id);
            if (solicitud == null)
                return NotFound("Solicitud no encontrada");

            var nuevoEstado = dto.NuevoEstado.ToUpperInvariant();
            if (nuevoEstado != "APROBADO" && nuevoEstado != "RECHAZADO")
                return BadRequest("Estado inválido. Debe ser APROBADO o RECHAZADO");

            solicitud.Estado = nuevoEstado;
            await _creditoRepo.UpdateAsync(solicitud);

            var analistaId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            await _logRepo.RegistrarLogAsync(new LogAuditoria
            {
                UsuarioId = analistaId,
                Accion = "Cambio de estado de solicitud",
                Detalle = $"Solicitud #{id} actualizada a {nuevoEstado}"
            });

            await _notificacionRepo.CrearAsync(new Notificacion
            {
                UsuarioId = solicitud.UsuarioId,
                CreditoId = solicitud.IdCredito,
                Mensaje = $"Su solicitud #{solicitud.IdCredito} fue {nuevoEstado.ToLower()}. {(dto.Observacion ?? "").Trim()}"
            });

            var result = await _creditoRepo.SaveChangesAsync();

            if (!result)
                return StatusCode(500, "Error al actualizar el estado de la solicitud");

            return Ok(new { mensaje = "Estado actualizado correctamente" });
        }
    }
}
