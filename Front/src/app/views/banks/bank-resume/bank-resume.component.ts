import { Component, OnInit, Input } from '@angular/core';
import { BankData } from '../../../models/banks/bank-data';
import { BankService } from '../../../services/bank.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-bank-resume',
	templateUrl: './bank-resume.component.html',
	styleUrls: ['./bank-resume.component.scss']
})
export class BankResumeComponent implements OnInit {
	@Input("source")
	public Data:BankData = null;

	constructor(private bs:BankService, private rs:Router) { 
	}

	ngOnInit() {
		if(this.Data==null) {
			this.Data = this.bs.CurrentBank;
		}
	}

	public async ShowDeletions(e:Event) {
		e.preventDefault();
		await this.rs.navigate(["bank/deletions/list"]);
	}
}
