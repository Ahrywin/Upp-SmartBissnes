import { CollectionBase } from './collection-base';

export class StoreData extends CollectionBase {
	public Code:string;
	public ParentID:string;
	public Checked:boolean = false;
}
