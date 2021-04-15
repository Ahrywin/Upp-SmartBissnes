using System;
using System.Configuration;
using System.IO;
using System.Text;

namespace creaworlds.Core.Framework.Tools
{
	public class Diagnostics
	{
		#region OnError
		public static void OnError(Exception ex)
		{
			try
			{
				string path = string.Format(@"{0}/{1}.log", ConfigurationManager.AppSettings["PATH_LOG"], DateTime.Now.Ticks);

				using (var fs = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write, FileShare.None))
				{
					using (StreamWriter sw = new StreamWriter(fs, Encoding.UTF8))
					{
						sw.WriteLine(ex);
					}
				}
			}
			catch (Exception)
			{
				throw ex;
			}
		}
		#endregion
	}
}
