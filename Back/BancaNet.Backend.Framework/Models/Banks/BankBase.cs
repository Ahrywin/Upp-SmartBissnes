namespace BancaNet.Backend.Framework.Models.Banks
{
	public abstract class BankBase
	{
		public string ID { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public bool? IsActive { get; set; }
	}
}