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
		public static ResponseObject<BankData> Submit(RequestObject<BankSubmit> request)
		{
			var response = new ResponseObject<BankData>();

			if (RequestsExtensions.IsValid(request, response))
			{
				if (string.IsNullOrWhiteSpace(request.Content.Name))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el nombre de la cuenta.", 1410);
				}
				else if (request.Content.Description == null)
				{
					response.Configure(Codes.BadRequest, "Favor de especifica la descripción de la cuenta", 1412);
				}
				else if (!request.Content.IsActive.HasValue)
				{
					response.Configure(Codes.BadRequest, "Favor de especifica el estatus de la cuenta", 1414);
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

							db.FillDataTable(response, "adm.SP_BANCO_INSERTA", (dt) =>
							{
								if (Convert.ToBoolean(db.GetParameter("done")))
								{
									response.Result = Common.Populate<BankData>(dt).First();
									response.CodeName = Codes.OK;
								}
								else
								{
									response = Common.Populate<ResponseEmpty>(dt).First().ToResponseObject<BankData>();
								}
							});
						}
						catch (Exception ex)
						{
							response.ConfigureAndLog("Ha ocurrido un error al registrar una cuenta bancaría.", 1500, ex);
						}
					}
				}
			}

			return response;
		}
	}
}