using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class NotifcacionRepository : INotificacionRepository
    {
        private readonly AppDbContext _db;
        public NotifcacionRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task CrearAsync(Notificacion notificacion)
        {
            await _db.Notificaciones.AddAsync(notificacion);
        }

        public async Task<bool> MarcarComoLeidaAsync(int id, int usuarioId)
        {
            var noti = await _db.Notificaciones
                .FirstOrDefaultAsync(n => n.NotificacionId == id && n.UsuarioId == usuarioId);

            if (noti == null) return false;

            noti.Leida = true;
            _db.Notificaciones.Update(noti);
            return true;
        }

        public async Task<List<Notificacion>> ObtenerPorUsuarioAsync(int usuarioId)
        {
            return await _db.Notificaciones
                .Where(n => n.UsuarioId == usuarioId && !n.Leida)
                .OrderByDescending(n => n.Fecha)
                .ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}
