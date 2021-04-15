using System;

namespace BancaNet.Backend.Framework.Models.Banks
{
	public sealed class BankData : BankBase
	{
		public DateTime? CreatedDate { get; set; }
		public DateTime? UpdatedDate { get; set; }
		public DateTime? BalanceDate { get; set; }
		public decimal? CurrentBalance { get; set; }
		public decimal? LastBalance { get; set; }
		public string CreatorUserID { get; set; }
		public string CreatorUserName { get; set; }
		public string ModifierUserID { get; set; }
		public string ModifierUserName { get; set; }
		public int? DeletionCount { get; set; }
	}
}