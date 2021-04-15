using System;
using System.Collections.Generic;
using System.Text;

namespace BancaNet.Backend.Framework.Models.Banks
{
	public sealed class TranFilter
	{
		public string BankID { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? FinishDate { get; set; }
	}
}
