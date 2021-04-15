import { Component, OnInit, ViewChild } from '@angular/core';
import { TranData } from '../../../models/banks/tran-data';
import { BankService } from '../../../services/bank.service';
import { Router } from '@angular/router';
import { ResponseCodes } from '../../../enumerators/response-codes';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PaginatorComponent } from '../../../components/paginator/paginator.component';
import { isNullOrUndefined } from 'util';
import { ToolsService } from '../../../services/tools.service';
import { TranFilter } from '../../../models/banks/tran-filter';

@Component({
	selector: 'app-tran-viewer',
	templateUrl: './tran-viewer.component.html',
	styleUrls: ['./tran-viewer.component.scss']
})
export class TranViewerComponent implements OnInit {
	@ViewChild("alert1", { static: true })
	public Alert1: AlertComponent;

	@ViewChild("paginator1", { static: true })
	public Paginator1: PaginatorComponent;

	public IsLoading: boolean = false;
	public Text2Search: string = "";

	public FormData: TranFilter = new TranFilter();

	constructor(private bs: BankService, private ts: ToolsService, private router: Router) {
	}

	ngOnInit() {
		this.Configure();
	}

	private Configure(): void {
		if (!isNullOrUndefined(this.bs.CurrentBank.ID)) {
			this.FormData.BankID = this.bs.CurrentBank.ID;
		}

		this.FormData.StartDate = this.ts.DateToString(new Date());
		this.FormData.FinishDate = this.FormData.StartDate;
		this.LoadData();
	}

	public async LoadData(e?:Event): Promise<any> {
		if (!isNullOrUndefined(this.FormData.StartDate) && isNullOrUndefined(this.FormData.FinishDate)) {
			this.Alert1.ShowAlert("Favor de especificar el periodo de búsqueda.");
		} else if (isNullOrUndefined(this.FormData.StartDate) && !isNullOrUndefined(this.FormData.FinishDate)) {
			this.Alert1.ShowAlert("Favor de especificar el periodo de búsqueda.");
		} else {
			this.IsLoading = true;
			const response = await this.bs.TranList(this.FormData);
			this.IsLoading = false;

			this.Alert1.Hide();
			this.Paginator1.SetSource([]);

			if (response.CodeNumber == ResponseCodes.Found || response.CodeNumber == ResponseCodes.NotFound) {
				this.Paginator1.SetSource(response.Result);
			} else {
				this.Alert1.ShowError(response.Message);
			}
		}
	}

	public GetData(): TranData[] {
		if (isNullOrUndefined(this.Paginator1)) return [];
		return this.Paginator1.Result;
	}

	public ShowNotFound(): boolean {
		if (isNullOrUndefined(this.Paginator1)) return false;
		return this.Paginator1.Result.length == 0 && !this.IsLoading;
	}

	public EditTran(sender: TranData): void {
		this.bs.CurrentTran = sender;
		this.router.navigate(["/bank/tran/edit"]);
	}
}
