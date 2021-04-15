import { Component, OnInit } from '@angular/core';
import { BankData } from '../../../models/banks/bank-data';
import { BankService } from '../../../services/bank.service';
import { ResponseCodes } from '../../../enumerators/response-codes';
import { Router } from '@angular/router';

@Component({
	selector: 'app-bank-viewer',
	templateUrl: './bank-viewer.component.html',
	styleUrls: ['./bank-viewer.component.scss']
})
export class BankViewerComponent implements OnInit {
	public BanksList: BankData[] = [];
	public IsLoading: boolean = false;

	constructor(private bs: BankService, private router: Router) {
	}

	ngOnInit() {
		this.LoadData();
	}

	private async LoadData(): Promise<any> {
		this.IsLoading = true;
		const response = await this.bs.List();
		this.IsLoading = false;

		if (response.CodeNumber == ResponseCodes.Found || response.CodeNumber == ResponseCodes.NotFound) {
			this.BanksList = response.Result;
		} else {

		}
	}

	public EditBank(sender: BankData): void {
		this.bs.CurrentBank = sender;
		this.router.navigate(["/bank/edit"]);
	}

	public ShowTrans(sender: BankData): void {
		this.bs.CurrentBank = sender;
		this.router.navigate(["/bank/tran/list"]);
	}
}
