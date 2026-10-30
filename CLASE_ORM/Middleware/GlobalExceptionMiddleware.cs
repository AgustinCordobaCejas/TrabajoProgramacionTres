using CLASE_ORM.Services;

namespace CLASE_ORM.Middleware;

public sealed class GlobalExceptionMiddleware(
    RequestDelegate next,
    ILogger<GlobalExceptionMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (OperationCanceledException) when (context.RequestAborted.IsCancellationRequested)
        {
            logger.LogDebug("La solicitud fue cancelada por el cliente.");
        }
        catch (System.Exception exception)
        {
            if (context.Response.HasStarted)
            {
                logger.LogError(exception, "No se puede escribir el error: la respuesta ya comenzó.");
                throw;
            }

            var (status, title, detail) = exception switch
            {
                NotFoundException => (StatusCodes.Status404NotFound, "Recurso no encontrado", exception.Message),
                ConflictException => (StatusCodes.Status409Conflict, "Conflicto", exception.Message),
                _ => (
                    StatusCodes.Status500InternalServerError,
                    "Error interno",
                    "Se produjo un error inesperado. Intente nuevamente.")
            };

            if (status >= StatusCodes.Status500InternalServerError)
            {
                logger.LogError(exception, "Error no controlado procesando {Path}", context.Request.Path);
            }
            else
            {
                logger.LogInformation(exception, "Solicitud rechazada en {Path}", context.Request.Path);
            }

            context.Response.Clear();
            context.Response.StatusCode = status;
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsJsonAsync(new ApiErrorResponse(
                DateTimeOffset.UtcNow,
                status,
                title,
                detail,
                context.Request.Path));
        }
    }
}
