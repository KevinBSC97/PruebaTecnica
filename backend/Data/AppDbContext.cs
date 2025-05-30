﻿using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Credito> Creditos { get; set; }
        public DbSet<LogAuditoria> LogsAuditoria { get; set; }
        public DbSet<Notificacion> Notificaciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Usuario>()
                .HasMany(u => u.Creditos)
                .WithOne(c => c.Usuario)
                .HasForeignKey(c => c.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Credito>()
                .Property(c => c.Monto)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Credito>()
                .Property(c => c.TasaInteres)
                .HasPrecision(5, 2);

            modelBuilder.Entity<Credito>()
                .Property(c => c.IngresoMensual)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Credito>()
                .Property(c => c.CuotaMensual)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Credito>()
                .Property(c => c.TotalPagar)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Notificacion>()
                .Property(n => n.Leida)
                .HasDefaultValue(false);

            modelBuilder.Entity<Notificacion>()
                .Property(n => n.Fecha)
                .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}
