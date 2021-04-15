import { Component, OnInit, Input } from '@angular/core';
import { BootstrapService } from '../../services/bootstrap.service';
import { BootstrapColors } from '../../enumerators/bootstrap-colors';

@Component({
	selector: 'app-progressbar',
	templateUrl: './progressbar.component.html',
	styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
	@Input() public IsStriped: boolean = true;
	@Input() public IsAnimated: boolean = true;
	@Input() public Value: number = 100;
	@Input() public BackgroundColor: BootstrapColors = BootstrapColors.Default;

	constructor(private Tools: BootstrapService) {
	};

	ngOnInit(): void {
	};

	public GetWidth(): any {
		return { "width": Math.trunc(this.Value) + "%" };
	};

	public GetProgressClass(): string[] {
		var result: string[] = [];

		if (this.IsStriped) {
			result.push("progress-bar-striped");
		}

		if (this.IsAnimated) {
			result.push("progress-bar-animated");
		}

		if (this.BackgroundColor != BootstrapColors.Default) {
			result.push(this.Tools.GetBackgroundColor(this.BackgroundColor));
		}

		return result;
	};
}
