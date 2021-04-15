import { CollectionBase } from './collection-base';

export class PromoData extends CollectionBase {
	public ParentID: string = null;
	public Description: string = "";
	public StartDate: Date = null;
	public FinishDate: Date = null;
}
