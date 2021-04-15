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
		public static ResponseObject<BankData[]> List(RequestEmpty request)
		{
			var response = new ResponseObject<BankData[]>();

			if (RequestsExtensions.IsValid(request, response))
			{
				using (var db = new DataBase())
				{
					try
					{
						db.AddParameter("request", SqlDbType.Xml, request.ToRequestEmpty());
						db.AddParameter("done", SqlDbType.Bit, ParameterDirection.Output);

						db.FillDataTable(response, "adm.SP_BANCO_LISTA", (dt) =>
						{
							if (Convert.ToBoolean(db.GetParameter("done")))
							{
								response.Result = Common.Populate<BankData>(dt);
								response.CodeName = (response.Result.Length > 0) ? Codes.Found : Codes.NotFound;
							}
							else
							{
								response = Common.Populate<ResponseEmpty>(dt).First().ToResponseObject<BankData[]>();
							}
						});
					}
					catch (Exception ex)
					{
						response.ConfigureAndLog("Ha ocurrido un error al listar las cuentas bancarías.", 1500, ex);
					}
				}
			}

			return response;
		}
	}
}