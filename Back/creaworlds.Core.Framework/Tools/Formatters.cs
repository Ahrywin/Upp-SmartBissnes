using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace creaworlds.Core.Framework.Tools
{
	public static class Formatters
	{
		#region RemoveDiacritics
		public static String RemoveDiacritics(this String s)
		{
			String normalizedString = s.Normalize(NormalizationForm.FormD);
			StringBuilder stringBuilder = new StringBuilder();

			for (int i = 0; i < normalizedString.Length; i++)
			{
				Char c = normalizedString[i];
				if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
				{
					stringBuilder.Append(c);
				}
			}

			return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
		}
		#endregion
	}
}
