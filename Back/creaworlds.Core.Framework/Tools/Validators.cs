using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace creaworlds.Core.Framework.Tools
{
	public static class Validators
	{
		#region IsNumber
		public static bool IsInteger(string text)
		{
			int numberConverted;
			return int.TryParse(text, out numberConverted);
		}

		public static bool IsLong(string text)
		{
			long numberConverted;
			return long.TryParse(text, out numberConverted);
		}
		#endregion

		#region IsGuid
		public static bool IsGuid(string text)
		{
			Guid numberConverted;
			return Guid.TryParse(text, out numberConverted);
		}
		#endregion

		#region IsRemoteAdddress
		public static bool IsRemoteAdddress(string text)
		{
			IPAddress output;
			return IPAddress.TryParse(text, out output);
		}
		#endregion
	}
}
