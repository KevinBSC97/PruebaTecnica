# PruebaTecnica - Crédito Online
Aplicación web para la gestión de solicitudes de crédito, desarrollada como parte de una prueba técnica. Cuenta con dos tipos de usuario: **Solicitante** y **Analista**, cada uno con funcionalidades específicas.

---

## Tecnlogias utlizadas

- **Frontend**: Angular v16.2.16 + PrimeNG + Bootstrap
- **Backend**: .Net 7 (ASP.NET Core Web API)
- **Base de Datos**: SQL Server
- **Herramientas**: Node 18.20.4 - .Net SDK 7.x - Visual Studio 2022 / VS Code

---

## BackEnd (.NET 7)
- Microsoft.EntityFrameworkCore (7.0.10)
- Microsoft.EntityFrameworkCore.SqlServer (7.0.10)
- Microsoft.EntityFrameworkCore.Tools (7.0.10)
- Microsoft.AspNetCore.Authentication.JwtBearer (7.0.10)
- Swashbuckle.AspNetCore (6.5.0)

## FrontEnd (Angular 16.2.16)
- PrimeNG + PrimeIcons
- Bootstrap 5.3
- jspdf + jspdf-autotable (para exportar PDF)

## Instalación y Ejecución
### BackEnd

1. **Adjuntar la base de datos**

   - Abre **SQL Server Management Studio** → clic derecho en **Bases de datos** → **Adjuntar…**  
   - Elige `PruebaTecnica.mdf` (incluido en la carpeta `/database` del repo).  
   - Confirma que el nombre lógico quede **PruebaTecnica**.

2. Configura `appsettings.json`:

```json
"ConnectionStrings": {
     //  Opción 1 ─ Inicio de sesión de Windows
     "ConexionSql": "Server=<NOMBRE-SQL>;Database=PruebaTecnica;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true",

     //  Opción 2 ─ Usuario y contraseña SQL
     "ConexionSql": "Server=<NOMBRE-SQL>;Database=PruebaTecnica;User Id=<USUARIO>;Password=<CONTRASEÑA>;MultipleActiveResultSets=true;TrustServerCertificate=true"
},
"JwtSettings": {
  "SecretKey": "P4l4br4s3cr3t4p4r4v41ld4r10$t0k3n,C4mb14r&p0r&un4p3r20n4112d4d",
  "Issuer": "KevinBackend",
  "Audience": "KevinFrontend",
  "ExpiresInMinutes": 15
}
```

- **OPCION 1**: Reemplazar <NOMBRE-SQL> con el nombre de tu instancia de SQL Server.
- **OPCION 2**: Reemplazar <NOMBRE-SQL>, <USUARIO> y <CONTRASEÑA> con el nombre de tu instancia, usuario y clave de SQL Server.

3. En consola, accede al directorio `backend/`:

```bash
cd backend
```

3. Ejecuta el proyecto:

```bash
dotnet run
```

La API se servirá en `https://localhost:5008`

### FrontEnd
1. En consola, dirígete al directorio `frontend/`:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta la aplicación Angular:

```bash
ng serve -o
```

Accede a través de `http://localhost:4200/auth/login`

---

## Archivos Incluidos

- `PruebTecnica.mdf` y `PruebaTecnica_log.ldf`: Base de datos SQL Server para probar sin migraciones.
- `Modelo ER - Kevin Sotomayor.pdf`: Diagrama entidad-relación completo.
- Código backend y frontend modularizado.
- Archivo `README.md` con guía completa.

---

## Usuariso de prueba
Puedes iniciar sesión con las siguientes cuentas:

Solicitante
Email: kevin@gmail.com

Password: 123456

Analista
Email: andres_peralta123@gmail.com

Password: 123456

