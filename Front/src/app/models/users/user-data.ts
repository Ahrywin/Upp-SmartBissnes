import { UserBase } from './user-base';

export class UserData extends UserBase {
	public ID: string;
	public FullName: string;
	public CompanyCode: string;
	public CompanyName: string;
	public CreatorUserID: string;
	public CreatorUserName: string;
	public ModifierUserID: string;
	public ModifierUserName: string;

	public LastLogin?: Date;
	public CreatedDate?: Date;
	public UpdatedDate?: Date;
	public ApiKey:string;
}
