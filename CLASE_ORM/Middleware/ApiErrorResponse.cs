namespace CLASE_ORM.Middleware;

public sealed record ApiErrorResponse(
    DateTimeOffset Timestamp,
    int Status,
    string Title,
    string Detail,
    string Instance,
    IReadOnlyDictionary<string, string[]>? Errors = null);
