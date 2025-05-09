using backend.Data;
using backend.Interfaces;
using backend.Models;

namespace backend.Repositories
{
    public class LogAuditoriaRepository : ILogAuditoriaRepository
    {
        private readonly AppDbContext _db;
        public LogAuditoriaRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task RegistrarLogAsync(LogAuditoria log)
        {
            await _db.LogsAuditoria.AddAsync(log);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}
