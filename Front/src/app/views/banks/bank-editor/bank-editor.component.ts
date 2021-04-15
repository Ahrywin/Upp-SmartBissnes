import { Component, OnInit, ViewChild } from '@angular/core';
import { BankSubmit } from '../../../models/banks/bank-submit';
import { isNullOrUndefined } from 'util';
import { BankService } from '../../../services/bank.service';
import { ResponseCodes } from '../../../enumerators/response-codes';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-bank-editor',
	templateUrl: './bank-editor.component.html',
	styleUrls: ['./bank-editor.component.scss']
})
export class BankEditorComponent implements OnInit {
	@ViewChild("alert1", { static: true })
	private Alert1: AlertComponent;
	public FormData: BankSubmit;
	public IsLoadingSubmit: boolean = false;

	constructor(private bs: BankService, private ar:ActivatedRoute) {
		this.ResetForm();
	}

	ngOnInit() {
		this.LoadData();
	}

	private LoadData():void {
		if(this.ar.snapshot.routeConfig.path == "bank/edit") {
			Object.assign(this.FormData, this.bs.CurrentBank);
		}
	}

	public ShowNewButton():boolean {
		return !isNullOrUndefined(this.FormData.ID);
	}

	public async SubmitForm(e: Event) {
		e.preventDefault();
		this.Alert1.Hide();

		if (this.FormData.Name == "") {
			this.Alert1.ShowAlert("El nombre de la cuenta bancaría es requerido");
		} else if (isNullOrUndefined(this.FormData.IsActive)) {
			this.Alert1.ShowAlert("El estatus de la cuenta bancaría es requerido");
		} else {
			this.IsLoadingSubmit = true;
			var response = await this.bs.Submit(this.FormData);
			this.IsLoadingSubmit = false;

			if (response.CodeNumber == ResponseCodes.OK) {
				const action = (isNullOrUndefined(this.FormData.ID)) ? "creado" : "actualizado";
				this.Alert1.ShowSuccess(`Registro ${action} correctamente.`);
				this.FormData.ID = response.Result.ID;
			} else {
				this.Alert1.ShowError(response.Message);
			}
		}
	}

	public ResetForm():void {
		this.FormData = new BankSubmit();
	}
}
