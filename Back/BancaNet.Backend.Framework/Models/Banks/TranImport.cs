using System;
using System.Collections.Generic;
using System.Text;

namespace BancaNet.Backend.Framework.Models.Banks
{
	public sealed class TranImport
	{
		public string BankID { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? FinishDate { get; set; }

		public string FileName { get; set; }
		public int? FileSize { get; set; }
		public string FileType { get; set; }
		public string FileData { get; set; }
	}
}
