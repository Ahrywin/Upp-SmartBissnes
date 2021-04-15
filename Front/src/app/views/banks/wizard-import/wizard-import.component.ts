import { Component, OnInit, ViewChild } from '@angular/core';
import { BankData } from '../../../models/banks/bank-data';
import { BankService } from '../../../services/bank.service';
import { TranImport } from '../../../models/banks/tran-import';
import { isNullOrUndefined } from 'util';
import { AlertComponent } from '../../../components/alert/alert.component';
import { ResponseCodes } from '../../../enumerators/response-codes';

@Component({
	selector: 'app-wizard-import',
	templateUrl: './wizard-import.component.html',
	styleUrls: ['./wizard-import.component.scss']
})
export class WizardImportComponent implements OnInit {
	@ViewChild("alert1", { static: true })
	public Alert1: AlertComponent;

	public IsLoadingSubmit: boolean = false;
	public IsLoadingBanks: boolean = false;

	public BankList: BankData[] = [];
	public FormData: TranImport = new TranImport();

	constructor(private bs: BankService) {

	}

	ngOnInit() {
		this.Configure();
	}

	private async Configure(): Promise<any> {
		this.IsLoadingBanks = true;
		this.BankList = (await this.bs.List()).Result;
		this.IsLoadingBanks = false;
	}

	public FileChanged(event: any) {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			const file = event.target.files[0];
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.FormData.FileName = file.name;
				this.FormData.FileSize = file.size;
				this.FormData.FileType = file.type;
				this.FormData.FileData = reader.result;
			};
		} else {
			this.FormData.FileData = null;
		}
	}

	public async SubmitForm(event: Event) {
		if (isNullOrUndefined(this.FormData.BankID)) {
			this.Alert1.ShowAlert("La cuenta bancaría es requerida");
		} else if(isNullOrUndefined(this.FormData.StartDate)) {
			this.Alert1.ShowAlert("La fecha inicial es requerida");
		} else if(isNullOrUndefined(this.FormData.FinishDate)) {
			this.Alert1.ShowAlert("La fecha final es requerida");
		} else if(isNullOrUndefined(this.FormData.FileData)) {
			this.Alert1.ShowAlert("El documento a importar es requerido");
		} else {
			this.Alert1.Hide();
			
			this.IsLoadingSubmit = true;
			var response = await this.bs.TranImport(this.FormData);
			this.IsLoadingSubmit = false;

			if(response.CodeNumber == ResponseCodes.OK) {
				this.Alert1.ShowSuccess("El documento ha sido importado correctamente");
			} else {
				this.Alert1.ShowError(response.Message);
			}
		}
	}
}
