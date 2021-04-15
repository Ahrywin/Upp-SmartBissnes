import { TranBase } from './tran-base';

export class TranData extends TranBase {
	public Code:string;
	public BankName:string;
	public TypeName:string;
	public CreatedDate:Date;
	public UpdatedDate:Date;
	public CurrentBalance:number;
	public CreatorUserID:string;
	public CreatorUserName:string;
	public ModifierUserID:string;
	public ModifierUserName:string;
}
