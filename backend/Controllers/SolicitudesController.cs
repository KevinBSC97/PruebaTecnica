using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Authorize(Roles = "SOLICITANTE")]
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitudesController : Controller
    {
        private readonly ICreditoRepository _creditoRepo;
        private readonly ILogAuditoriaRepository _logRepo;
        public SolicitudesController(ICreditoRepository creditoRepo, ILogAuditoriaRepository logRepo)
        {
            _creditoRepo = creditoRepo;
            _logRepo = logRepo;
        }

        [HttpPost("crear-solicitud")]
        public async Task<IActionResult> CrearSolicitud([FromBody] CreditoCreateDTO dto)
        {
            var usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var monto = dto.Monto;
            var tasaMensual = dto.TasaInteres / 100m;
            var plazo = dto.Plazo;

            decimal cuotaMensual = 0;

            if(tasaMensual > 0)
            {
                var factor = (decimal)Math.Pow(1 + (double)tasaMensual, -plazo);
                cuotaMensual = monto * tasaMensual / (1 - factor);
            } else
            {
                cuotaMensual = monto / plazo;
            }

            var totalPagar = cuotaMensual * plazo;

            var solicitud = new Credito
            {
                Monto = monto,
                Plazo = plazo,
                TasaInteres = dto.TasaInteres,
                IngresoMensual = dto.IngresoMensual,
                AntiguedadLaboral = dto.AntiguedadLaboral,
                RelacionDependencia = dto.RelacionDependencia,
                Estado = dto.IngresoMensual >= 1500 ? "APROBADO" : "PENDIENTE",
                FechaSolicitud = DateTime.UtcNow,
                UsuarioId = usuarioId,
                CuotaMensual = Math.Round(cuotaMensual, 2),
                TotalPagar = Math.Round(totalPagar, 2)
            };

            await _creditoRepo.AddAsync(solicitud);
            await _logRepo.RegistrarLogAsync(new LogAuditoria
            {
                UsuarioId = usuarioId,
                Accion = "Crear solicitud",
                Detalle = $"Monto: {dto.Monto}, Plazo: {dto.Plazo}, Estado: {solicitud.Estado}"
            });

            var result = await _creditoRepo.SaveChangesAsync();

            if (!result)
                return StatusCode(500, "No se pudo crear la solicitud");

            return Ok("Solicitud de crédito registrada con éxito");
        }

        [HttpGet()]
        public async Task<IActionResult> ObtenerMisSolicitudes()
        {
            var usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var solicitudes = await _creditoRepo.GetByUsuarioIdAsync(usuarioId);
            return Ok(solicitudes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerDetalle(int id)
        {
            var usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var solicitud = await _creditoRepo.GetByIdAsync(id);

            if (solicitud == null || solicitud.UsuarioId != usuarioId)
                return NotFound("Solicitud no encontrada");

            return Ok(solicitud);
        }
    }
}
