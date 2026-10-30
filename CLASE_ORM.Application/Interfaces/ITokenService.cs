using CLASE_ORM.Entities;

namespace CLASE_ORM.Interfaces;

public interface ITokenService
{
    string Generate(Usuario usuario);
}
