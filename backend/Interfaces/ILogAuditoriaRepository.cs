using backend.Models;

namespace backend.Interfaces
{
    public interface ILogAuditoriaRepository
    {
        Task RegistrarLogAsync(LogAuditoria log);
        Task<bool> SaveChangesAsync();
    }
}
