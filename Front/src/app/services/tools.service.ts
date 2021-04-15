import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ToolsService {
	constructor() {
	}

	public DateToString(value: any): Date {
		try {
			var date = null;
			if(typeof(value) === "object") {
				date = value;
			} else {
				date = new Date(value);
			}
			return date.toISOString().substr(0, 10) as any;
		} catch(e) {
			console.error(e);
			return null;
		}
	}

	public Left(txt:string, length:number):string {
		return txt.substr(0, length);
	}

	public Right(txt:string, length:number):string {
		return txt.substr(txt.length - length, length);
	}

	public Repeat(repeat:string, times:number) {
		return repeat.repeat(times);
	}
}
