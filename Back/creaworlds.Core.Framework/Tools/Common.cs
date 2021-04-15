using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Reflection;
using System.Xml.Serialization;

namespace creaworlds.Core.Framework.Tools
{
	public static class Common
	{
		#region PopulateObjects
		/// <summary>
		/// Se utiliza para llenar los objetos automaticamente con el resultado de la base de datos
		/// </summary>
		/// <param name="dt">DataTable con el resultado de la consulta</param>
		/// <param name="destintationType">Tipo de Dato a Generar</param>
		/// <returns>Devuelve un Array del Tipo <typeparam name="T"></typeparam></returns>
		public static T[] Populate<T>(DataTable dt) where T : new()
		{
#if DEBUG
			DateTime watch = DateTime.Now;
#endif

			T[] result = new T[dt.Rows.Count];
			List<PropertyInfo> propertiesList = new List<PropertyInfo>();

			try
			{
				// seleccionamos solo aquellas propiedades que se encuentran en el datatable
				foreach (PropertyInfo propertie in typeof(T).GetProperties())
				{
					if (dt.Columns.Contains(propertie.Name))
					{
						propertiesList.Add(propertie);
					}
				}

				int i = 0;
				foreach (DataRow row in dt.Rows)
				{
					T obj = new T();
					foreach (PropertyInfo propertie in propertiesList)
					{
						if (!row.IsNull(propertie.Name))
						{
							object val = null;

							if (propertie.PropertyType.IsEnum)
							{
								val = Enum.Parse(propertie.PropertyType, Convert.ToString(row[propertie.Name]));
							}
							else if (propertie.PropertyType.IsGenericType)
							{
								if (propertie.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
								{
									val = Convert.ChangeType(row[propertie.Name], Nullable.GetUnderlyingType(propertie.PropertyType));
								}
							}
							else
							{
								if (propertie.PropertyType == typeof(String))
								{
									val = Convert.ToString(row[propertie.Name]);
								}
								else
								{
									val = Convert.ChangeType(row[propertie.Name], propertie.PropertyType);
								}
							}

							propertie.SetValue(obj, val, null);
						}
					}

					result[i++] = obj;
				}
			}
			catch (Exception ex)
			{
				Tools.Diagnostics.OnError(new Exception(string.Format("Ha ocurrido un error al tratar de poblar de manera automatica la entidad \"{0}\".", typeof(T).FullName), ex));
				throw ex;
			}

#if DEBUG
			System.Diagnostics.Debug.WriteLine(string.Format("Populate de {0}: {1}", typeof(T).FullName, DateTime.Now.Subtract(watch).TotalMilliseconds));
#endif

			return result;
		}
		#endregion

		#region Serializer
		/// <summary>
		/// Obtiene el XML correspondiente a un objeto
		/// </summary>
		/// <param name="sender">Objeto a Cambiar</param>
		/// <returns>Cadena con el XML generado</returns>
		public static string Serializer(object sender)
		{
			using (MemoryStream ms = new MemoryStream())
			{
				XmlSerializer xmlSerializer = new XmlSerializer(sender.GetType());
				xmlSerializer.Serialize(ms, sender);
				ms.Seek(0, SeekOrigin.Begin);

				using (StreamReader sr = new StreamReader(ms))
				{
					return sr.ReadToEnd();
				}
			}
		}
		#endregion
	}
}
