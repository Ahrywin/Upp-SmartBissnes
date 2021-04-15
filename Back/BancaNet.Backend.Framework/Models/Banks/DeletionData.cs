using System;

namespace BancaNet.Backend.Framework.Models.Banks
{
	public sealed class DeletionData
	{
		public string ID { get; set; }
		public string BankID { get; set; }
		public DateTime? CreatedDate { get; set; }
		public DateTime? AuthorizedDate { get; set; }
		public string UserCreatorID { get; set; }
		public string UserCreatorName { get; set; }
		public string UserAuthorizerID { get; set; }
		public string UserAuthorizerName { get; set; }
		public bool? IsAuthorized { get; set; }
		public int? DeletionCount { get; set; }
	}
}
