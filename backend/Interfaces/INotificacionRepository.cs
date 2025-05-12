using backend.Models;

namespace backend.Interfaces
{
    public interface INotificacionRepository
    {
        Task<List<Notificacion>> ObtenerPorUsuarioAsync(int usuarioId);
        Task CrearAsync(Notificacion notificacion);
        Task<bool> MarcarComoLeidaAsync(int id, int usuarioId);
        Task<bool> SaveChangesAsync();
    }
}
