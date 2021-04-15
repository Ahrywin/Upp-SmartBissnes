import { BankBase } from './bank-base';

export class BankData extends BankBase {
	public BalanceDate:Date = null;
	public CurrentBalance:number = null;
	public LastBalance:number = null;

	public CreatedDate:Date = null;
	public UpdatedDate:Date = null;
	public CreatorUserID:string = null;
	public CreatorUserName:string = null;
	public ModifierUserID:string = null;
	public ModifierUserName:string = null;

	public DeletionCount:number = 0;

	public FechaCreacion: Date=null;
	public UserName:string =null;
	


}
