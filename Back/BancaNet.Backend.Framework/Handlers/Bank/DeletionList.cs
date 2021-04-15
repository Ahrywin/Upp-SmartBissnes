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
		public static ResponseObject<DeletionData[]> DeletionList(RequestObject<DeletionFilter> request)
		{
			var response = new ResponseObject<DeletionData[]> { Result = new DeletionData[0] };

			if (RequestsExtensions.IsValid(request, response))
			{
				if (!Validators.IsGuid(request.Content.BankID))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el ID de la cuenta.", 1410);
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

							db.FillDataTable(response, "adm.SP_BANCO_TRANSACCION_ELIMINACION_LISTA", (dt) =>
							{
								if (Convert.ToBoolean(db.GetParameter("done")))
								{
									response.Result = Common.Populate<DeletionData>(dt);
									response.CodeName = (dt.Rows.Count > 0) ? Codes.Found : Codes.NotFound;
								}
								else
								{
									response = Common.Populate<ResponseEmpty>(dt).First().ToResponseObject<DeletionData[]>(new DeletionData[0]);
								}
							});
						}
						catch (Exception ex)
						{
							response.ConfigureAndLog("Ha ocurrido un error al listar las eliminaciones de la cuenta bancaría.", 1500, ex);
						}
					}
				}
			}

			return response;
		}
	}
}
