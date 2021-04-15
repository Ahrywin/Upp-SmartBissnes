using BancaNet.Backend.Framework.Models.Users;
using creaworlds.Core.Framework.Enumerators.Responses;
using creaworlds.Core.Framework.Extensions;
using creaworlds.Core.Framework.Models.Responses;
using creaworlds.Core.Framework.Tools;
using System;
using System.Data;
using System.Linq;

namespace BancaNet.Backend.Framework.Handlers
{
	public static partial class User
	{
		public static ResponseObject<UserData> Login(UserLogin request)
		{
			var response = new ResponseObject<UserData>();

			if (request == null)
			{
				response.ConfigureNullRequest(1400);
			}
			else if (string.IsNullOrWhiteSpace(request.UserName))
			{
				response.Configure(Codes.BadRequest, "Favor de especificar el nombre de usuario.", 1410);
			}
			else if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length != 40)
			{
				response.Configure(Codes.BadRequest, "Favor de especifica la contraseña", 1412);
			}
			else
			{
				using (var db = new DataBase())
				{
					try
					{
						db.AddParameter("request", SqlDbType.Xml, request);
						db.AddParameter("done", SqlDbType.Bit, ParameterDirection.Output);

						db.FillDataTable(response, "SP_USUARIO_LOGIN", (dt) =>
						{
							if (Convert.ToBoolean(db.GetParameter("done")))
							{
								response.Result = Common.Populate<UserData>(dt).First();
								response.CodeName = Codes.Found;
							}
							else
							{
								response = Common.Populate<ResponseEmpty>(dt).First().ToResponseObject<UserData>();
							}
						});
					}
					catch (Exception ex)
					{
						response.ConfigureAndLog("Ha ocurrido un error al realizar el login de un usuario.", 1500, ex);
					}
				}
			}

			return response;
		}
	}
}
