using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CreditoRepository : ICreditoRepository
    {
        private readonly AppDbContext _db;
        public CreditoRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task AddAsync(Credito credito)
        {
            await _db.Creditos.AddAsync(credito);
        }

        public async Task<IEnumerable<Credito>> GetAllAsync()
        {
            return await _db.Creditos
                .Include(c => c.Usuario)
                .ToListAsync();
        }

        public async Task<Credito> GetByIdAsync(int id)
        {
            return await _db.Creditos
                .Include(c => c.Usuario)
                .FirstOrDefaultAsync(c => c.IdCredito == id);
        }

        public async Task<IEnumerable<Credito>> GetByUsuarioIdAsync(int usuarioId)
        {
            return await _db.Creditos
                .Where(c => c.UsuarioId == usuarioId)
                .ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync() > 0;
        }

        public async Task UpdateAsync(Credito credito)
        {
            _db.Creditos.Update(credito);
        }
    }
}
