using BancaNet.Backend.Framework.Models.Users;
using creaworlds.Core.Framework.Models.Responses;
using System.Web.Http;
using UserHandler = BancaNet.Backend.Framework.Handlers;

namespace BancaNet.Backend.WebApi.Controllers
{
	public class UserController : ApiController
	{
		[HttpPost]
		public ResponseObject<UserData> Login(UserLogin request) => UserHandler.User.Login(request);
	}
}