using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace creaworlds.Core.Framework.Extensions
{
	public static class DataObjects
	{
		public static bool Contains(this DataTableCollection ds, int index)
		{
			var result = true;

			try
			{
				var data = ds[index];
			}
			catch (Exception)
			{
				result = false;
			}

			return result;
		}
	}
}
