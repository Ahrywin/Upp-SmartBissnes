using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BancaNet.Backend.Framework.Models.Users
{
	public sealed class UserLogin
	{
		public string UserName { get; set; }
		public string Password { get; set; }
	}
}
