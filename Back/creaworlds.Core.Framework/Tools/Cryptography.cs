using System;
using System.Security.Cryptography;
using System.Text;

namespace creaworlds.Core.Framework.Tools
{
	public static class Cryptography
	{
		#region SHA1
		public static string ComputeSHA1(string text)
		{
			return BitConverter.ToString(SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(text))).Replace("-", "");
		}
		#endregion
	}
}
