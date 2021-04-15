using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace creaworlds.Core.Framework.Interfaces.Requests
{
	public interface IRequest
	{
		string UserID { get; set; }
		string Token { get; set; }
		string Signature { get; set; }
	}
}
