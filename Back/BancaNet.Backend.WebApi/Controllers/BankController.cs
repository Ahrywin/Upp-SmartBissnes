using BancaNet.Backend.Framework.Handlers;
using BancaNet.Backend.Framework.Models.Banks;
using creaworlds.Core.Framework.Models.Requests;
using creaworlds.Core.Framework.Models.Responses;
using System.Web.Http;

namespace BancaNet.Backend.WebApi.Controllers
{
	public class BankController : ApiController
	{
		[HttpPost]
		public ResponseObject<BankData> Submit(RequestObject<BankSubmit> request) => Bank.Submit(request);

		[HttpPost]
		public ResponseObject<BankData[]> List(RequestEmpty request) => Bank.List(request);

		[HttpPost]
		[Route("bank/tran/submit")]
		public ResponseObject<TranData> TranSubmit(RequestObject<TranSubmit> request) => Bank.TranSubmit(request);

		[HttpPost]
		[Route("bank/tran/list")]
		public ResponseObject<TranData[]> TranList(RequestObject<TranFilter> request) => Bank.TranList(request);

		[HttpPost]
		[Route("bank/tran/import")]
		public ResponseEmpty TranImport(RequestObject<TranImport> request) => Bank.TranImport(request);

		[HttpPost]
		[Route("bank/deletion/list")]
		public ResponseObject<DeletionData[]> DeletionList(RequestObject<DeletionFilter> request) => Bank.DeletionList(request);
	}
}
