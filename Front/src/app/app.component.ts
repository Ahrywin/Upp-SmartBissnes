import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
	// tslint:disable-next-line
	selector: 'body',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
	constructor(private router: Router, private auth:AuthenticationService) { 

	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			this.auth.Validate();
			window.scrollTo(0, 0);
		});
	}
}
