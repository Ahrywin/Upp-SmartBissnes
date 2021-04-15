using BancaNet.Backend.Framework.Models.Banks;
using creaworlds.Core.Framework.Enumerators.Responses;
using creaworlds.Core.Framework.Extensions;
using creaworlds.Core.Framework.Models.Requests;
using creaworlds.Core.Framework.Models.Responses;
using creaworlds.Core.Framework.Tools;
using System;
using System.Data;
using System.Linq;

namespace BancaNet.Backend.Framework.Handlers
{
	public static partial class Bank
	{
		public static ResponseObject<TranData> TranSubmit(RequestObject<TranSubmit> request)
		{
			var response = new ResponseObject<TranData>();

			if (RequestsExtensions.IsValid(request, response))
			{
				if (!Validators.IsGuid(request.Content.BankID))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el ID de la cuenta.", 1410);
				}
				else if (string.IsNullOrWhiteSpace(request.Content.TypeID))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el Tipo de la Transacción.", 1412);
				}
				else if (!request.Content.EventDate.HasValue)
				{
					response.Configure(Codes.BadRequest, "Favor de especificar la Fecha de la Transacción.", 1414);
				}
				else if (!request.Content.Amount.HasValue || request.Content.Amount < 0)
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el Importe de la Transacción.", 1416);
				}
				else if (string.IsNullOrWhiteSpace(request.Content.Description))
				{
					response.Configure(Codes.BadRequest, "Favor de especifica la descripción de la cuenta", 1418);
				}
				else
				{
					using (var db = new DataBase())
					{
						try
						{
							db.AddParameter("request", SqlDbType.Xml, request.ToRequestEmpty());
							db.AddParameter("content", SqlDbType.Xml, request.Content);
							db.AddParameter("done", SqlDbType.Bit, ParameterDirection.Output);

							db.FillDataTable(response, "adm.SP_BANCO_TRANSACCION_INSERTA", (dt) =>
							{
								if (Convert.ToBoolean(db.GetParameter("done")))
								{
									response.Result = Common.Populate<TranData>(dt).First();
									response.CodeName = Codes.OK;
								}
								else
								{
									response = Common.Populate<ResponseEmpty>(dt).First().ToResponseObject<TranData>();
								}
							});
						}
						catch (Exception ex)
						{
							response.ConfigureAndLog("Ha ocurrido un error al registrar un movimiento de la cuenta bancaría.", 1500, ex);
						}
					}
				}
			}

			return response;
		}
	}
}
