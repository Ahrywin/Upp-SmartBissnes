using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancaNet.Backend.Framework.Models.Users
{
	public abstract class UserBase
	{
		public string CompanyID { get; set; }
		public string UserName { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string eMail { get; set; }
		public bool? IsRoot { get; set; }
		public bool? IsActive { get; set; }
	}
}
