using creaworlds.Core.Framework.Models.Responses;
using creaworlds.Core.Framework.Enumerators.Responses;
using creaworlds.Core.Framework.Interfaces.Responses;
using creaworlds.Core.Framework.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace creaworlds.Core.Framework.Extensions
{
	public static class Responses
	{
		public static void Configure(this IResponse sender, Codes code)
		{
			sender.CodeName = code;
		}

		public static void Configure(this IResponse sender, Codes code, string message, int? errorNumber)
		{
			sender.CodeName = code;
			sender.Message = message;
			sender.ErrorNumber = errorNumber;
		}

		public static void ConfigureNullRequest(this IResponse sender, int errorNumber)
		{
			sender.Configure(Codes.BadRequest, "No se han especificado los parametros requeridos para realizar la operación o son inválidos.", errorNumber);
		}

		public static void ConfigureNullContent(this IResponse sender, int errorNumber)
		{
			sender.Configure(Codes.BadRequest, "No se han especificado el contenido de la solicitud o es inválida.", errorNumber);
		}

		public static void ConfigureNullAuthorID(this IResponse sender, int errorNumber)
		{
			sender.Configure(Codes.BadRequest, "No se ha especificado el ID del usuario que realiza la operación o es inválido.", errorNumber);
		}

		public static void ConfigureConnectionFailure(this IResponse sender)
		{
			sender.Configure(Codes.ServiceUnavailable, "Ha ocurrido un error al conectar con la capa de datos.", 1501);
		}

		public static void ConfigureTranBeginFailure(this IResponse sender)
		{
			sender.Configure(Codes.InternalServerError, "Ha ocurrido un error al iniciar la operación con la capa de datos.", 1502);
		}

		public static void ConfigureTranCommitFailure(this IResponse sender)
		{
			sender.Configure(Codes.InternalServerError, "Ha ocurrido un error al confirmar la operación con la capa de datos.", 1503);
		}

		public static void ConfigureUnauthorized(this IResponse sender, int errorNumber)
		{
			sender.Configure(Codes.Unauthorized, "No se han especificado las credenciales de la solicitud o son inválidos.", errorNumber);
		}

		public static void ConfigureAndLog(this IResponse sender, string message, int? errorNumber, Exception ex)
		{
			sender.Configure(Codes.InternalServerError, message, errorNumber);
			Diagnostics.OnError(new Exception(sender.Message, ex));
		}

		public static ResponseObject<T> ToResponseObject<T>(this IResponse sender, T result = null) where T : class
		{
			return new ResponseObject<T>
			{
				CodeName = sender.CodeName,
				Message = sender.Message,
				ErrorNumber = sender.ErrorNumber,
				Result = result
			};
		}
	}
}
