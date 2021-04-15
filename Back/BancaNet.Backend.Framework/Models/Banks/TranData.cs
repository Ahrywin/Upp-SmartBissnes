using System;
using System.Collections.Generic;
using System.Text;

namespace BancaNet.Backend.Framework.Models.Banks
{
	public sealed class TranData : TranBase
	{
		public string Code { get; set; }
		public string BankName { get; set; }
		public string TypeName { get; set; }
		public DateTime? CreatedDate { get; set; }
		public DateTime? UpdatedDate { get; set; }
		public decimal? CurrentBalance { get; set; }
		public string CreatorUserID { get; set; }
		public string CreatorUserName { get; set; }
		public string ModifierUserID { get; set; }
		public string ModifierUserName { get; set; }
	}
}
