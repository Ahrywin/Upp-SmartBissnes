import { Component, OnInit, Input } from '@angular/core';
import { BootstrapColors } from '../../enumerators/bootstrap-colors';
import { BootstrapService } from '../../services/bootstrap.service';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input() public HeaderVisible: boolean = false;
	@Input() public FooterVisible: boolean = false;
	@Input() public IsCollapsed: boolean = false;

	@Input() public AccentColor: BootstrapColors = BootstrapColors.Default;
	@Input() public BorderColor: BootstrapColors = BootstrapColors.Default;
	@Input() public BackgroundColor: BootstrapColors = BootstrapColors.Default;

	@Input() public BadgeVisible: boolean = false;
	@Input() public BadgeColor: BootstrapColors = BootstrapColors.Default;
	@Input() public BadgeValue: String = "0";
	@Input() public BadgePill: boolean = true;

	constructor(private Tools: BootstrapService) {

	};

	ngOnInit() {
	};

	public GetContainerClass(): string[] {
		var result: string[] = [];

		if (this.BackgroundColor != BootstrapColors.Default) {
			result.push(this.Tools.GetBackgroundColor(this.BackgroundColor));
		}

		if (this.BorderColor != BootstrapColors.Default) {
			result.push(this.Tools.GetBorderColor(this.BackgroundColor));
		}

		if (this.AccentColor != BootstrapColors.Default) {
			result.push(this.Tools.GetCustomColor(this.BackgroundColor, "card-accent-"));
		}

		return result;
	};

	public GetFooterClass(): string[] {
		var result: string[] = [];

		if (this.BackgroundColor != BootstrapColors.Default) {
			result.push(this.Tools.GetBackgroundColor(this.BackgroundColor));
		}

		return result;
	};

	public GetBadgeClass(): string[] {
		var result: string[] = [];

		if (this.BadgePill) {
			result.push("badge-pill");
		}

		if (this.BadgeColor != BootstrapColors.Default) {
			result.push(this.Tools.GetCustomColor(this.BackgroundColor, "badge-"));
		}

		return result;
	};
}
