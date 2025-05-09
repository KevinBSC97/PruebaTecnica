using backend.Models;

namespace backend.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario?> GetEmailAsync(string email);
        Task<Usuario?> GetByIdAsync(int id);
        Task<IEnumerable<Usuario>> GetAllAsync();
        Task AddAsync(Usuario usuario);
        Task<bool> SaveChangesAsync();
    }
}
