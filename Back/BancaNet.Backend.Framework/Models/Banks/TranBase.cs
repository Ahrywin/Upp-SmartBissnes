using System;
using System.Collections.Generic;
using System.Text;

namespace BancaNet.Backend.Framework.Models.Banks
{
	public abstract class TranBase
	{
		public string ID { get; set; }
		public string BankID { get; set; }
		public string TypeID { get; set; }
		public DateTime? EventDate { get; set; }
		public decimal? Amount { get; set; }
		public string Description { get; set; }
	}
}
