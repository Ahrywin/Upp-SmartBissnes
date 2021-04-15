using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace creaworlds.Core.Framework.Interfaces.Responses
{
	public interface IResultable<obj> : IResponse
	{
		obj Result { get; set; }
	}
}
