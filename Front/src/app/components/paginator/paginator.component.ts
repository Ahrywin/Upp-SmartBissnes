import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
	@Input("page-size")
	public PageSize:number = 10;
	public CurrentPage:number = 1;
	public TotalPages:number = 1;

	public Source:any[] = [];
	public Result:any[] = [];

	constructor() { 
	}

	ngOnInit() {
		this.PageSize = Math.trunc(this.PageSize);
	}

	public SetSource(value:any[]):void {
		this.Source = value;
		this.CurrentPage = 1;
		this.TotalPages = Math.ceil(this.Source.length / this.PageSize);
		this.CalculateResult();
	}

	private CalculateResult():void {
		const startIndex = (this.CurrentPage - 1) * this.PageSize;
		const stopIndex = startIndex + this.PageSize;
		this.Result = this.Source.slice(startIndex, stopIndex);
	}

	public MovePrev(e:Event) {
		e.preventDefault();
		(e.target as any).blur();

		if(this.CurrentPage > 1) {
			this.CurrentPage -= 1;
			this.CalculateResult();
		}
	}

	public MoveNext(e:Event) {
		e.preventDefault();
		(e.target as any).blur();
		
		if(this.CurrentPage < this.TotalPages) {
			this.CurrentPage += 1;
			this.CalculateResult();
		}
	}

	public ShowPaginator():boolean {
		return this.Result.length > 0;
	}
}
