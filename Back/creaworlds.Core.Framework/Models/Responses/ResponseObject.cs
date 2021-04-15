using creaworlds.Core.Framework.Interfaces.Responses;

namespace creaworlds.Core.Framework.Models.Responses
{
	public sealed class ResponseObject<obj> : ResponseBase, IResponse, IResultable<obj>
	{
		public obj Result { get; set; }
	}
}
