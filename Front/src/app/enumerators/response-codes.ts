export enum ResponseCodes {
	/// <summary>
	/// La operación se ejecuto correctamente
	/// </summary>
	OK = 200,

	/// <summary>
	/// La información suministrada es incorrecta
	/// </summary>
	BadRequest = 400,

	/// <summary>
	/// El valor suministrado causa conflicto con otro ya existente en el sistema
	/// </summary>
	Conflict = 409,

	/// <summary>
	/// Ha ocurrido un error interno en el servidor
	/// </summary>
	InternalServerError = 500,

	/// <summary>
	/// Servicio no Disponible
	/// </summary>
	ServiceUnavailable = 503,

	/// <summary>
	/// Error Desconocido
	/// </summary>
	NotImplemented = 501,

	/// <summary>
	/// El objeto solicitado fue encontrado
	/// </summary>
	Found = 302,

	/// <summary>
	/// El objeto solicitado no fue encontrado
	/// </summary>
	NotFound = 404,

	/// <summary>
	/// Operación Autorizada
	/// </summary>
	Approved = 202,

	/// <summary>
	/// Operación Declinada
	/// </summary>
	Declined = 402,

	/// <summary>
	/// Operación Declinada
	/// </summary>
	Unauthorized = 401,

	/// <summary>
	/// Error desconocido desde el cliente
	/// </summary>
	BadGateway = 502
}
