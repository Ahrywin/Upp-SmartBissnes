// IMPLEMENTACION DEL MODULO CREAR USUARIO

import { Component, OnInit, ViewChild } from '@angular/core';
import { TranSubmit } from '../../../models/banks/tran-submit';
import { isNullOrUndefined } from 'util';
import { BankService } from '../../../services/bank.service';
import { BankData } from '../../../models/banks/bank-data';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ResponseCodes } from '../../../enumerators/response-codes';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../../services/tools.service';

@Component({
	selector: 'app-tran-editor',
	templateUrl: './tran-editor.component.html',
	styleUrls: ['./tran-editor.component.scss']
})
export class TranEditorComponent implements OnInit {
	@ViewChild("alert1", { static: false })
	public alert1: AlertComponent;

	public FormData: TranSubmit;
	public IsLoadingSubmit: boolean = false;

	//public BankList: BankData[] = [];
	public LoadingBanks: boolean = false;

	constructor(private bs: BankService, private ar:ActivatedRoute, private ts:ToolsService) {
		this.ResetForm();
	}

	ngOnInit() {
		this.Configure();
	}

	private async Configure(): Promise<any> {
		if(this.ar.routeConfig.path == "bank/tran/edit") {
			Object.assign(this.FormData, this.bs.CurrentTran);
			this.FormData.EventDate = this.ts.DateToString(this.FormData.EventDate);
		}
		
		this.LoadingBanks = true;
		//this.BankList = (await this.bs.List()).Result;
		this.LoadingBanks = false;
	}
//
	public async SubmitForm(e: Event): Promise<any> {
		if (this.FormData.TypeID==null) {
			this.alert1.ShowAlert("El rol de usuario es requerido.");
		} else if (isNullOrUndefined(this.FormData.Amount) || typeof (this.FormData.Amount) !== "number" || this.FormData.Amount <= 0) {
			this.alert1.ShowAlert("El importe del movimiento es requerido.");
		} else if (isNullOrUndefined(this.FormData.Description)) {
			this.alert1.ShowAlert("La descripción del movimiento es requerida.");
		} else {
			this.alert1.Hide();
			this.IsLoadingSubmit = true;
			const response = await this.bs.TranSubmit(this.FormData);
			this.IsLoadingSubmit = false;

			if (response.CodeNumber == ResponseCodes.OK) {
				const action = (isNullOrUndefined(this.FormData.ID)) ? "creado" : "modificado";
				this.alert1.ShowSuccess(`La alta ha sido hecha${action} correctamente.`);
				this.FormData.ID = response.Result.ID;
			} else {
				this.alert1.ShowError(response.Message);
			}
		}
	}

	public ShowNewButton(): boolean {
		return !isNullOrUndefined(this.FormData.ID);
	}

	public ResetForm(): void {
		this.FormData = new TranSubmit();
	}
}
