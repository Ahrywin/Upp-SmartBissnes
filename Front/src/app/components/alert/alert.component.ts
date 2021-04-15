import { Component, OnInit, Input } from '@angular/core';
import { BootstrapColors } from '../../enumerators/bootstrap-colors';
import { BootstrapService } from '../../services/bootstrap.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
	@Input() public Body: string = "";
	@Input() public BackgroundColor: BootstrapColors = BootstrapColors.Default;
	@Input() public IsVisible: boolean = false;
	@Input() public IconName: string;

	constructor(private bs:BootstrapService) {
	}

	ngOnInit() {
	}

	public Show(text: string, backgroundColor: BootstrapColors, icon:string): void {
		this.Body = text;
		this.BackgroundColor = backgroundColor;
		this.IconName = icon;
		this.IsVisible = true;
	};

	public ShowError(text:string): void {
		this.Show(text, BootstrapColors.Danger, "fa fa-close");
	}

	public ShowAlert(text:string): void {
		this.Show(text, BootstrapColors.Warning, "fa fa-exclamation-triangle");
	}

	public ShowSuccess(text:string): void {
		this.Show(text, BootstrapColors.Success, "fa fa-check");
	}

	public ShowInfo(text:string): void {
		this.Show(text, BootstrapColors.Info, "fa fa-info-circle");
	}

	public Hide(): void {
		this.IsVisible = false;
	}

	private GetContainerClass(): string[] {
		var result: string[] = [];

		if (this.BackgroundColor != BootstrapColors.Default) {
			result.push(this.bs.GetBackgroundColor(this.BackgroundColor));
		} else {
			result.push(this.bs.GetBackgroundColor(BootstrapColors.Primary));
		}

		return result;
	};
}
