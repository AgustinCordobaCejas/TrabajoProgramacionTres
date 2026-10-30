# TP de programación: API académica

Sistema de gestión de alumnos y materias con API ASP.NET Core, Entity Framework Core y frontend Angular.

## Estructura

- `CLASE_ORM.Domain`: entidades del dominio.
- `CLASE_ORM.Application`: DTO, contratos, casos de uso, validaciones y paginación.
- `CLASE_ORM.Infrastructure`: persistencia EF Core, repositorios, JWT, hash de contraseñas y aprovisionamiento del administrador inicial.
- `CLASE_ORM`: API, controladores, middleware global y migraciones Code First.
- `TestAngular`: aplicación Angular con Angular Material.

Las dependencias apuntan hacia el dominio: la API consume Application e Infrastructure; Infrastructure implementa los contratos definidos por Application.

## Requisitos y ejecución local

1. Configurá SQL Server y la cadena `ConnectionStrings:Con`. Se puede sobreescribir mediante la variable `ConnectionStrings__Con`.
2. Configurá `Jwt:Key` con un valor aleatorio de al menos 32 bytes mediante User Secrets (`dotnet user-secrets set "Jwt:Key" "<clave aleatoria>" --project CLASE_ORM\CLASE_ORM.csproj`) o la variable de entorno `Jwt__Key`. La clave no se guarda en `appsettings.json`.
3. Para aprovisionar el primer administrador, definí las tres variables de entorno siguientes antes de iniciar la API:

   ```powershell
   $env:AdminBootstrap__Name = "Administrador"
   $env:AdminBootstrap__Email = "admin@ejemplo.local"
   $env:AdminBootstrap__Password = "<contraseña segura de al menos 12 caracteres>"
   ```

   Al iniciar, la API crea esa cuenta con rol `Admin` o promueve la cuenta existente con ese email. Si las tres variables no están configuradas, el registro público sigue asignando solamente `User` y la API lo informa en el log. Nunca se acepta el rol desde el formulario de registro.

4. Ejecutá la API:

   ```powershell
   dotnet run --project CLASE_ORM\CLASE_ORM.csproj
   ```

   Al iniciar, la API aplica las migraciones pendientes. Swagger está disponible en el entorno Development.

5. En otra terminal, iniciá Angular:

   ```powershell
   cd TestAngular
   npm install
   npm start
   ```

   La API local usa `http://localhost:5201` y Angular `http://localhost:4200`.

## Ejecutar todo con Docker

Se necesita Docker Desktop iniciado con contenedores Linux y soporte para Docker Compose.

1. Desde la raíz del proyecto, copiá el archivo de ejemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Editá `.env` y reemplazá **todos** los valores `ChangeMe...` por contraseñas/clave propias. `MSSQL_SA_PASSWORD` debe cumplir la política de complejidad de SQL Server y no contener `;`; `JWT_KEY` debe tener al menos 32 bytes; `ADMIN_BOOTSTRAP_PASSWORD`, al menos 12 caracteres. `.env` no se incluye en Docker ni en Git.
3. Iniciá la aplicación:

   ```powershell
   docker compose up --build
   ```

   La primera construcción descarga las imágenes y puede tardar varios minutos. Compose espera a que SQL Server esté saludable; la API aplica las migraciones Code First antes de iniciar y crea/promueve la cuenta Admin configurada.

4. Abrí:

   - Frontend Angular: `http://localhost:4200`
   - Swagger (entorno local de desarrollo): `http://localhost:5201/swagger`
   - SQL Server para herramientas locales: `localhost,1433` (usuario `sa` y contraseña de `.env`)

Comandos útiles:

```powershell
docker compose ps
docker compose logs -f api
docker compose down
```

Los datos de SQL Server persisten en el volumen `sqlserver_data` incluso después de `docker compose down`. Para borrar la base local y todos sus datos explícitamente:

```powershell
docker compose down --volumes
```

No uses las imágenes, el usuario `sa`, las credenciales de `.env` ni Swagger de desarrollo tal cual en producción.

## Funcionalidad

- Registro y login con JWT; las contraseñas se almacenan con BCrypt.
- Lectura de alumnos y materias para usuarios autenticados; las operaciones de alta, modificación y baja requieren el rol `Admin` tanto en la API como en la interfaz.
- Listados paginados con `page` y `pageSize` (máximo 100) y búsqueda con `filter`.
- Alumnos: filtro por nombre, email o materia. Materias: filtro por nombre.
- La API devuelve errores con `timestamp`, `status`, `title`, `detail`, `instance` y, para errores de validación, `errors`.
- Angular Material se utiliza en tablas, diálogos, formularios, selectores, botones y paginadores.

Ejemplos de consulta (requieren un token Bearer):

```text
GET /api/Alumno?page=1&pageSize=10&filter=matematica
GET /api/Materia?page=2&pageSize=5&filter=historia
```

## Migraciones futuras

Al agregar o cambiar entidades del dominio, creá una migración desde la carpeta del proyecto:

```powershell
dotnet ef migrations add NombreDeLaMigracion --project CLASE_ORM\CLASE_ORM.csproj --startup-project CLASE_ORM\CLASE_ORM.csproj
dotnet ef database update --project CLASE_ORM\CLASE_ORM.csproj --startup-project CLASE_ORM\CLASE_ORM.csproj
```
