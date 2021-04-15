import { Injectable } from '@angular/core';
import { BootstrapColors } from '../enumerators/bootstrap-colors';

@Injectable({
	providedIn: 'root'
})
export class BootstrapService {
	public GetColor(value: BootstrapColors): string {
		var result: string;

		switch (value) {
			case BootstrapColors.Danger:
				result = "danger";
				break;
			case BootstrapColors.Warning:
				result = "warning";
				break;
			case BootstrapColors.Info:
				result = "info";
				break;
			case BootstrapColors.Primary:
				result = "primary";
				break;
			case BootstrapColors.Success:
				result = "success";
				break;
			default:
				//noting to do
				break;
		}

		return result;
	};

	public GetCustomColor(value: BootstrapColors, prefix: string, suffix?: string): string {
		var result: string;

		if (value != BootstrapColors.Default) {
			result = this.GetColor(value);
			if (prefix != null) result = prefix.concat(result);
			if (suffix != null) result.concat(suffix);
		}

		return result;
	}

	public GetBackgroundColor(value: BootstrapColors): string {
		var result: string;

		if (value != BootstrapColors.Default) {
			result = this.GetCustomColor(value, "bg-");
		}

		return result;
	}

	public GetBorderColor(value: BootstrapColors): string {
		var result: string;

		if (value != BootstrapColors.Default) {
			result = this.GetCustomColor(value, "border-");
		}

		return result;
	}

	public CalculateIndex(index: number, length: number): void {
		//si el indice no ha sido especificado lo especificamos
		if (index == null) {
			index = 0;
		}

		//reiniciamos el indice, si supera el máximo
		if (index >= length) {
			index = index - Math.trunc(index / length) * length;
		}
	};
}
