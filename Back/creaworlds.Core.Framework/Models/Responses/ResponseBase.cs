using creaworlds.Core.Framework.Enumerators.Responses;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace creaworlds.Core.Framework.Models.Responses
{
	public abstract class ResponseBase
	{
		#region Fields
		internal int? _intCodeNumber = (int)Codes.NotImplemented;
		internal Codes _objCodeName = Codes.NotImplemented;
		#endregion

		#region CodeNumber
		/// <summary>
		/// Identificador del Código de Respuesta.
		/// </summary>
		public int? CodeNumber
		{
			get { return this._intCodeNumber; }
			set
			{
				this._intCodeNumber = value;
				this._objCodeName = (Codes)this._intCodeNumber;
			}
		}
		#endregion

		#region CodeName
		/// <summary>
		/// Nombre del Código de Respuesta.
		/// </summary>
		[JsonConverter(typeof(StringEnumConverter))]
		public Codes CodeName
		{
			get { return this._objCodeName; }
			set
			{
				this._objCodeName = value;
				this._intCodeNumber = (int?)this._objCodeName;
			}
		}
		#endregion

		#region Message
		/// <summary>
		/// Mensaje resultado de la operación.
		/// </summary>
		public string Message { get; set; }
		
		#endregion

		#region ServerName
		public string ServerName
		{
			set { }
			get { return System.Environment.MachineName; }
		}
		#endregion

		#region ErrorNumber
		/// <summary>
		/// Número de Error en caso de existir.
		/// </summary>
		public int? ErrorNumber { get; set; }
		#endregion

		#region Constructor
		public ResponseBase()
		{
			this.CodeName = Codes.NotImplemented;
		}
		#endregion
	}
}
