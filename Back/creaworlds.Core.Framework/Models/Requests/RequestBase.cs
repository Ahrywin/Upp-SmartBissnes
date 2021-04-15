using creaworlds.Core.Framework.Interfaces.Requests;

namespace creaworlds.Core.Framework.Models.Requests
{
	public abstract class RequestBase : IRequest
	{
		public string UserID { get; set; }
		public string Token { get; set; }
		public string Signature { get; set; }
	}
}
