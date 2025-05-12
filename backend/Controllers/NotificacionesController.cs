using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "SOLICITANTE")]
    public class NotificacionesController : Controller
    {
        private readonly INotificacionRepository _notificacionRepo;
        public NotificacionesController(INotificacionRepository notificacionRepo)
        {
            _notificacionRepo = notificacionRepo;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerNotificaciones()
        {
            var usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var notis = await _notificacionRepo.ObtenerPorUsuarioAsync(usuarioId);

            var result = notis.Select(n => new NotificacionDTO
            {
                NotificacionId = n.NotificacionId,
                Mensaje = n.Mensaje,
                Fecha = n.Fecha,
                Leida = n.Leida
            });

            return Ok(result);
        }

        [HttpPut("marcar/{id}")]
        public async Task<IActionResult> MarcarComoLeida(int id)
        {
            var usuarioId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var result = await _notificacionRepo.MarcarComoLeidaAsync(id, usuarioId);

            if (!result)
                return NotFound("No se encontró la notificación");

            await _notificacionRepo.SaveChangesAsync();
            return Ok(new { mensaje = "Notificación marcada como leída" });
        }
    }
}
