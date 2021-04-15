using creaworlds.Core.Framework.Enumerators.Responses;
using creaworlds.Core.Framework.Extensions;
using creaworlds.Core.Framework.Interfaces.Responses;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace BancaNet.Backend.Framework.Handlers
{
	public static partial class Bank
	{
		public static bool TranValidate(string data, IResponse response, out object[][] result)
		{
			var done = false;
			byte[] fileData = null;
			result = null;

			try
			{
				var content = data.Split(new string[] { "base64," }, StringSplitOptions.None)[1];
				fileData = Convert.FromBase64String(content);
			}
			catch (Exception ex)
			{
				response.ConfigureAndLog("Ha ocurrido un error al realizar la lectura de un documento.", 1100, ex);
			}

			if (fileData != null)
			{
				using (var ms = new MemoryStream(fileData))
				{
					using (var doc = SpreadsheetDocument.Open(ms, false))
					{
						var sheetsList = doc.WorkbookPart.Workbook.Sheets;
						var sharedStringTable = doc.WorkbookPart.GetPartsOfType<SharedStringTablePart>().First().SharedStringTable;

						if (sheetsList.Count() == 1)
						{
							var rowList = new List<object[]>();
							var sheetData = doc.WorkbookPart.WorksheetParts.First().Worksheet.Elements<SheetData>().First();

							foreach (var row in sheetData.Elements<Row>())
							{
								var valueList = new List<object>();
								foreach (var cell in row.Elements<Cell>())
								{
									object value = null;

									if (cell.DataType != null)
									{
										if (cell.DataType == CellValues.SharedString)
										{
											int ssid = int.Parse(cell.CellValue.Text);
											value = sharedStringTable.ChildElements[ssid].InnerText;
										}
										else
										{
											value = cell.CellValue?.Text;
										}
									}
									else
									{
										value = cell.CellValue?.Text;
									}

									valueList.Add(value);
								}
								System.Diagnostics.Debug.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(valueList.ToArray()));
								rowList.Add(valueList.ToArray());
							}

							result = rowList.ToArray();
							done = true;
						}
						else
						{
							response.Configure(Codes.BadRequest, "El documento contiene cero o más de una pestaña.", 1110);
						}
					}
				}
			}

			return done;
		}
	}
}
