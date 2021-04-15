using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace creaworlds.Core.Framework.Extensions
{
	public static partial class Collections
	{
		public static void RemoveNullItems<T>(this IEnumerable<T> list)
		{
			list = list.Where(x => x != null);
		}
	}
}
