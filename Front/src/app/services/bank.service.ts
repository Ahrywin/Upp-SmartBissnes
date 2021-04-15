import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseObject } from '../models/responses/response-object';
import { BankData } from '../models/banks/bank-data';
import { BankSubmit } from '../models/banks/bank-submit';
import { TranSubmit } from '../models/banks/tran-submit';
import { TranData } from '../models/banks/tran-data';
import { TranFilter } from '../models/banks/tran-filter';
import { TranImport } from '../models/banks/tran-import';
import { DeletionFilter } from '../models/banks/deletion-filter';
import { DeletionData } from '../models/banks/deletion-data';

@Injectable({
	providedIn: 'root'
})
export class BankService {
	public CurrentBank:BankData = null;
	public CurrentTran:TranData = null;
	
	constructor(private api: ApiService) {
	}

	public async List(): Promise<ResponseObject<BankData[]>> {
		return await this.api.PostAndSign<BankData[], any>("bank/list");
	}

	public async Submit(data: BankSubmit): Promise<ResponseObject<BankData>> {
		return await this.api.PostAndSign<BankData, BankSubmit>("bank/submit", data);
	}

	public async TranSubmit(data: TranSubmit): Promise<ResponseObject<TranData>> {
		return await this.api.PostAndSign<TranData, TranSubmit>("bank/tran/submit", data);
	}

	public async TranList(data: TranFilter): Promise<ResponseObject<TranData[]>> {
		return await this.api.PostAndSign<TranData[], TranFilter>("bank/tran/list", data);
	}

	public async TranImport(data: TranImport) {
		return await this.api.PostAndSign<any, TranImport>("bank/tran/import", data);
	}

	public DeletionList(data: DeletionFilter): Promise<ResponseObject<DeletionData[]>> {
		return this.api.PostAndSign<DeletionData[], DeletionFilter>("bank/deletion/list", data);
	}
}