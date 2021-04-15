using creaworlds.Core.Framework.Extensions;
using creaworlds.Core.Framework.Interfaces.Responses;
using creaworlds.Core.Framework.Tools;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace creaworlds.Core.Framework.Tools
{
	public sealed class DataBase : IDisposable
	{
		internal readonly SqlCommand cmd;

		#region Constructor
		public DataBase()
		{
			this.cmd = new SqlCommand();
		}
		#endregion

		#region ConnectionStringName
		public string ConnectionStringName { get; set; } = "DATASERVER";
		#endregion

		#region SQLConnect
		public bool OpenConnection()
		{
			bool done = false;

			try
			{
				this.cmd.CommandType = CommandType.StoredProcedure;
				this.cmd.Connection = new SqlConnection(ConfigurationManager.ConnectionStrings[this.ConnectionStringName].ConnectionString);
				this.cmd.Connection.Open();
				done = (this.cmd.Connection.State == ConnectionState.Open);
			}
			catch (Exception ex)
			{
				Diagnostics.OnError(new Exception("Ha ocurrido un error al tratar de conectar con la base de datos.", ex));
			}

			return done;
		}
		#endregion

		#region GetDataSet
		public DataSet GetDataSet(string sql, bool clearParameters = false)
		{
			DataSet ds = new DataSet();

			this.cmd.CommandText = sql;

			using (SqlDataAdapter da = new SqlDataAdapter(this.cmd))
			{
				da.Fill(ds);
			}

			if (clearParameters)
			{
				this.cmd.Parameters.Clear();
			}

			return ds;
		}
		#endregion

		#region GetDataTable
		public DataTable GetDataTable(string sql, bool clearParameters = false)
		{
			DataTable dt = new DataTable();

			this.cmd.CommandText = sql;

			using (SqlDataAdapter da = new SqlDataAdapter(this.cmd))
			{
				da.Fill(dt);
			}

			if (clearParameters)
			{
				this.cmd.Parameters.Clear();
			}

			return dt;
		}
		#endregion

		#region FillDataTable
		public void FillDataTable(IResponse response, string sql, Action<DataTable> action, bool clearParams = false)
		{
			if (!this.OpenConnection())
			{
				response.ConfigureConnectionFailure();
			}
			else
			{
				using (DataTable dt = this.GetDataTable(sql, clearParams))
				{
					action.Invoke(dt);
				}
			}
		}
		#endregion

		#region FillDataSet
		public void FillDataSet(IResponse response, string sql, Action<DataSet> action, bool clearParams = false)
		{
			if (!this.OpenConnection())
			{
				response.ConfigureConnectionFailure();
			}
			else
			{
				using (DataSet ds = this.GetDataSet(sql, clearParams))
				{
					action.Invoke(ds);
				}
			}
		}
		#endregion

		#region SetTimeOut
		/// <summary>
		/// CommandTimeout in Minutes
		/// </summary>
		public void SetTimeout(int minutes)
		{
			this.cmd.CommandTimeout = Convert.ToInt32(TimeSpan.FromMinutes(minutes).TotalSeconds);
		}
		#endregion

		#region Parameters
		public void AddParameter(string name, SqlDbType type, object value)
		{
			if (type == SqlDbType.Xml)
			{
				this.cmd.Parameters.Add(name, type).Value = Common.Serializer(value);
			}
			else
			{
				this.cmd.Parameters.Add(name, type).Value = value;
			}
		}

		public void AddParameter(string name, SqlDbType type, ParameterDirection direction)
		{
			this.cmd.Parameters.Add(name, type).Direction = direction;
		}

		public void AddParameter(string name, SqlDbType type, int size, ParameterDirection direction)
		{
			this.cmd.Parameters.Add(name, type, size).Direction = direction;
		}

		public object GetParameter(string name)
		{
			return this.cmd.Parameters[name]?.Value;
		}
		#endregion

		#region CloseDBConnection
		public void CloseConnection()
		{
			if (this.cmd.Connection != null)
			{
				try
				{
					this.cmd.Connection.Close();
				}
				catch (Exception ex)
				{
					Diagnostics.OnError(new Exception("HA OCURRIDO UN ERROR AL TRATAR DE CERRAR LA CONEXIÓN CON LA BASE DE DATOS", ex));
				}
			}
		}
		#endregion

		#region Dispose
		public void Dispose()
		{
			this.CloseConnection();
		}
		#endregion
	}
}