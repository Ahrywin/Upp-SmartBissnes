using creaworlds.Core.Framework.Enumerators.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace creaworlds.Core.Framework.Interfaces.Responses
{
	public interface IResponse
	{
		int? CodeNumber { get; set; }
		Codes CodeName { get; set; }
		string Message { get; set; }
		int? ErrorNumber { get; set; }
	}
}
