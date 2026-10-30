using CLASE_ORM.Entities.DTO.Login;
using CLASE_ORM.Interfaces;
using CLASE_ORM.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CLASE_ORM.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {


        private readonly IAuthService _authService;



        public AuthController(
            IAuthService authService)
        {
            _authService = authService;
        }





        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterDto dto)
        {


            await _authService.RegisterAsync(dto);


            return Ok(new
            {
                message =
                "Usuario registrado correctamente"
            });

        }







        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginDto dto)
        {

            var token =
            await _authService.LoginAsync(dto);



            if (token == null)
            {

                return Unauthorized(new ApiErrorResponse(
                    DateTimeOffset.UtcNow,
                    StatusCodes.Status401Unauthorized,
                    "No autorizado",
                    "Credenciales inválidas.",
                    Request.Path));

            }



            return Ok(new
            {
                token
            });

        }






        // Dashboard usuario normal

        [Authorize]
        [HttpGet("dashboard-a")]
        public IActionResult DashboardA()
        {

            return Ok(
                "Dashboard usuario"
            );

        }






        // Dashboard administrador


        [Authorize(Roles = "Admin")]
        [HttpGet("dashboard-b")]
        public IActionResult DashboardB()
        {

            return Ok(
                "Dashboard administrador"
            );

        }


    }

}