namespace CLASE_ORM.Interfaces;

public interface IAdminBootstrapper
{
    Task InitializeAsync(CancellationToken cancellationToken = default);
}
