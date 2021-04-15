import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatorComponent } from '../../../components/paginator/paginator.component';
import { BankService } from '../../../services/bank.service';
import { ResponseCodes } from '../../../enumerators/response-codes';
import { AlertComponent } from '../../../components/alert/alert.component';
import { isNullOrUndefined } from 'util';
import { DeletionData } from '../../../models/banks/deletion-data';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tran-delete-viewer',
	templateUrl: './tran-delete-viewer.component.html',
	styleUrls: ['./tran-delete-viewer.component.scss']
})
export class TranDeleteViewerComponent implements OnInit {
	@ViewChild("paginator1", { static: true })
	private Paginator1: PaginatorComponent;

	@ViewChild("alert1", { static: false })
	private Alert1: AlertComponent;

	public IsLoading: boolean = false;

	constructor(private bs: BankService, private rs:Router) {
	}

	ngOnInit() {
		this.LoadData();
	}

	private async LoadData() {
		this.IsLoading = true;
		this.Paginator1.SetSource([]);
		var response = await this.bs.DeletionList({
			BankID: this.bs.CurrentBank.ID
		});
		this.IsLoading = false;

		if (response.CodeNumber == ResponseCodes.Found) {
			this.Paginator1.SetSource(response.Result);
		} else if (response.CodeNumber != ResponseCodes.NotFound) {
			this.Alert1.ShowError(response.Message);
		}
	}

	public GetData() {
		if (isNullOrUndefined(this.Paginator1)) return [];
		return this.Paginator1.Result;
	}

	public ShowNotFound() {
		return (this.GetData().length == 0);
	}

	public GetAuthorizedClass(obj:DeletionData) {
		let result = [];

		if(!isNullOrUndefined(obj.IsAuthorized)) {
			if(obj.IsAuthorized) {
				result.push("badge-success");
			} else {
				result.push("badge-danger");
			}
		} else {
			result.push("badge-warning");
		}

		return result;
	}

	public GetAuthorizedLabel(obj:DeletionData) {
		if(!isNullOrUndefined(obj.IsAuthorized)) {
			if(obj.IsAuthorized) {
				return "Autorizado";
			} else {
				return "Cancelado";
			}
		} else {
			return "Pendiente";
		}
	}

	public ShowDetail(obj:DeletionData, e:Event) {
		e.preventDefault();
		this.rs.navigate(["bank/deletions/detail"]);
	}
}
