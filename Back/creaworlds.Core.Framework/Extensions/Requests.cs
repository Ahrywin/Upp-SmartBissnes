using creaworlds.Core.Framework.Enumerators.Responses;
using creaworlds.Core.Framework.Interfaces.Requests;
using creaworlds.Core.Framework.Interfaces.Responses;
using creaworlds.Core.Framework.Models.Requests;
using creaworlds.Core.Framework.Tools;

namespace creaworlds.Core.Framework.Extensions
{
	public static class RequestsExtensions
	{
		#region For Internal Use Only
		internal static bool Validate(IRequest request, IResponse response)
		{
			var done = false;

			if (request == null)
			{
				response.ConfigureNullRequest(1410);
			}
			else if (string.IsNullOrWhiteSpace(request.UserID))
			{
				response.Configure(Codes.BadRequest, "Favor de especificar el Usuario que realiza la solicitud.", 1412);
			}
			else if (!Validators.IsGuid(request.Token))
			{
				response.Configure(Codes.BadRequest, "Favor de especificar el Token en el formato solicitado.", 1414);
			}
			else if (string.IsNullOrWhiteSpace(request.Signature) || request.Signature.Length != 40)
			{
				response.Configure(Codes.BadRequest, "Favor de especificar el la Firma Electrónica en el formato especificado.", 1416);
			}
			else
			{
				done = true;
			}

			return done;
		}
		#endregion

		/// <summary>
		/// Verifica la integridad de una solicitud del tipo IRequest
		/// </summary>
		/// <param name="request"></param>
		/// <param name="response"></param>
		/// <returns></returns>
		public static bool IsValid(RequestEmpty request, IResponse response)
		{
			return RequestsExtensions.Validate(request, response);
		}

		/// <summary>
		/// Verifica la integridad de una solicitud del tipo RequestObject
		/// </summary>
		/// <param name="request"></param>
		/// <param name="response"></param>
		/// <returns></returns>
		public static bool IsValid<T>(RequestObject<T> request, IResponse response)
		{
			var done = false;

			if (RequestsExtensions.Validate(request, response))
			{
				if (request.Content == null)
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el contenido de la solicitud.", 1418);
				}
				else
				{
					done = true;
				}
			}

			return done;
		}

		public static RequestEmpty ToRequestEmpty(this IRequest sender)
		{
			return new RequestEmpty
			{
				UserID = sender.UserID,
				Token = sender.Token,
				Signature = sender.Signature
			};
		}

		public static RequestObject<T> ToRequestObject<T>(this IRequest sender, T content = null) where T : class
		{
			return new RequestObject<T>
			{
				UserID = sender.UserID,
				Token = sender.Token,
				Signature = sender.Signature,
				Content = content
			};
		}
	}
}
