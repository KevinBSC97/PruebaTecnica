using backend.DTOs;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IUsuarioRepository _usuarioRepo;
        private readonly JwtHelper _jwtHelper;
        public AuthController(IUsuarioRepository usuarioRepo, JwtHelper jwtHelper)
        {
            _usuarioRepo = usuarioRepo;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO dto)
        {
            var usuario = await _usuarioRepo.GetEmailAsync(dto.Email);
            if (usuario == null || !VerifyPassword(dto.Password, usuario.Password))
                return Unauthorized("Credenciales incorrectas");

            var token = _jwtHelper.GenerateToken(usuario);

            return Ok(new
            {
                token,
                usuario = new
                {
                    usuario.IdUsuario,
                    usuario.Identificacion,
                    usuario.Nombre,
                    usuario.Apellido,
                    usuario.Email,
                    usuario.Rol
                }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UsuarioRegistroDTO dto)
        {
            var usuarioExistente = await _usuarioRepo.GetEmailAsync(dto.Email);
            if (usuarioExistente != null)
                return BadRequest("Ya existe un usuario registrado con ese correo electrónico");

            var nuevoUsuario = new Usuario
            {
                Identificacion = dto.Identificacion,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Password = EncriptarPassword(dto.Password),
                FechaCreacion = DateTime.UtcNow,
                Rol = "ANALISTA"
            };

            await _usuarioRepo.AddAsync(nuevoUsuario);
            var exito = await _usuarioRepo.SaveChangesAsync();

            if (!exito)
                return StatusCode(500, "No se pudo completar el registro");

            return Ok(new { mensaje = "Usuario registrado exitosamente"} );
        }

        private bool VerifyPassword(string plainPassword, string hashedPassword)
        {
            using var sha = SHA256.Create();
            var hashBytes = sha.ComputeHash(Encoding.UTF8.GetBytes(plainPassword));
            var hashString = Convert.ToBase64String(hashBytes);
            return hashString == hashedPassword;
        }

        private string EncriptarPassword(string password)
        {
            using var sha = SHA256.Create();
            var hashBytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashBytes);
        }
    }
}
