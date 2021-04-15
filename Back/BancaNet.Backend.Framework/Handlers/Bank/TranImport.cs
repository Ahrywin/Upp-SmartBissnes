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
		public static ResponseEmpty TranImport(RequestObject<TranImport> request)
		{
			object[][] rowList;
			var response = new ResponseEmpty();

			if (RequestsExtensions.IsValid(request, response))
			{
				if (!Validators.IsGuid(request.Content.BankID))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el ID de la cuenta.", 1410);
				}
				else if (string.IsNullOrEmpty(request.Content.FileName))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el nombre del documento.", 1412);
				}
				else if (!request.Content.FileSize.HasValue)
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el tamaño del documento.", 1414);
				}
				else if (string.IsNullOrEmpty(request.Content.FileType))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el tipo de documento.", 1416);
				}
				else if (string.IsNullOrEmpty(request.Content.FileData))
				{
					response.Configure(Codes.BadRequest, "Favor de especificar el contenido del documento.", 1418);
				}
				else
				{
					if (Bank.TranValidate(request.Content.FileData, response, out rowList))
					{
						using (var db = new DataBase())
						{
							try
							{
								db.AddParameter("request", SqlDbType.Xml, request.ToRequestEmpty());
								db.AddParameter("content", SqlDbType.Xml, request.Content);
								db.AddParameter("rowdata", SqlDbType.Xml, rowList);
								db.AddParameter("done", SqlDbType.Bit, ParameterDirection.Output);

								db.FillDataTable(response, "adm.SP_BANCO_TRANSACCION_IMPORTA", (dt) =>
								{
									if (Convert.ToBoolean(db.GetParameter("done")))
									{
										response.CodeName = Codes.OK;
									}
									else
									{
										response = Common.Populate<ResponseEmpty>(dt).First();
									}
								});
							}
							catch (Exception ex)
							{
								response.ConfigureAndLog("Ha ocurrido un error al importar movimientos bancarios.", 1500, ex);
							}
						}
					}
				}
			}

			return response;
		}
	}
}