using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize(Roles = "ANALISTA")]
    [ApiController]
    [Route("api/[controller]")]
    public class CreditoController : Controller
    {
        private readonly ICreditoRepository _creditoRepo;
        private readonly ILogAuditoriaRepository _logRepo;
        public CreditoController(ICreditoRepository creditoRepo, ILogAuditoriaRepository logRepo)
        {
            _creditoRepo = creditoRepo;
            _logRepo = logRepo;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodas([FromBody] string? estado)
        {
            var solicitudes = await _creditoRepo.GetAllAsync();

            if (!string.IsNullOrEmpty(estado))
            {
                solicitudes = solicitudes
                    .Where(s => s.Estado.Equals(estado, StringComparison.OrdinalIgnoreCase));
            }

            return Ok(solicitudes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerDetalle(int id)
        {
            var solicitud = await _creditoRepo.GetByIdAsync(id);

            if (solicitud == null)
                return NotFound("Solicitud no encontrada");

            var estadoSugerido = solicitud.IngresoMensual >= 1500 ? "APROBADO" : "PENDIENTE";

            return Ok(new
            {
                solicitud.IdCredito,
                solicitud.Monto,
                solicitud.Plazo,
                solicitud.IngresoMensual,
                solicitud.AntiguedadLaboral,
                solicitud.RelacionDependencia,
                solicitud.Estado,
                EstadoSugerido = estadoSugerido,
                Usuario = new
                {
                    solicitud.Usuario.Nombre,
                    solicitud.Usuario.Apellido,
                    solicitud.Usuario.Email
                }
            });
        }

        [HttpPut("{id}/estado")]
        public async Task<IActionResult> CambiarEstado(int id, [FromQuery] string nuevoEstado)
        {
            var solicitud = await _creditoRepo.GetByIdAsync(id);

            if (solicitud == null)
                return NotFound("Solicitud no encontrada");

            if (nuevoEstado != "APROBADO" && nuevoEstado != "RECHAZADO")
                return BadRequest("Estado inválid. Debe ser APROBADO o RECHAZADO");

            solicitud.Estado = nuevoEstado;
            await _creditoRepo.UpdateAsync(solicitud);

            var analistaId = int.Parse(User.FindFirst("sub")!.Value);
            await _logRepo.RegistrarLogAsync(new LogAuditoria
            {
                UsuarioId = analistaId,
                Accion = "Cambio de estado de solicitud",
                Detalle = $"Solicitud #{id} actualizada a {nuevoEstado}"
            });

            var result = await _creditoRepo.SaveChangesAsync() && await _logRepo.SaveChangesAsync();

            if (!result)
                return StatusCode(500, "Error al actualizar el estado de la solicitud");

            return Ok("Estado actualizado correctamente");
        }
    }
}
