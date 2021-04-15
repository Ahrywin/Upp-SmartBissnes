using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancaNet.Backend.Framework.Models.Users
{
	public sealed class UserData : UserBase
	{
		public string ID { get; set; }
		public string ApiKey { get; set; }
		public string FullName { get; set; }
		public string CompanyName { get; set; }
		public string CreatorUserID { get; set; }
		public string CreatorUserName { get; set; }
		public string ModifierUserID { get; set; }
		public string ModifierUserName { get; set; }
		public DateTime? CreatedDate { get; set; }
		public DateTime? UpdatedDate { get; set; }
		public DateTime? LastLogin { get; set; }
	}
}
