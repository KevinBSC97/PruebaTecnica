using backend.Models;

namespace backend.Interfaces
{
    public interface ICreditoRepository
    {
        Task<Credito> GetByIdAsync(int id);
        Task<IEnumerable<Credito>> GetAllAsync();
        Task<IEnumerable<Credito>> GetByUsuarioIdAsync(int usuarioId);
        Task AddAsync(Credito credito);
        Task UpdateAsync(Credito credito);
        Task<bool> SaveChangesAsync();
    }
}
