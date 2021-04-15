namespace creaworlds.Core.Framework.Models.Requests
{
	public sealed class RequestObject<T> : RequestBase
	{
		public T Content { get; set; }
	}
}
