import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems, NavData } from '../../_nav';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
	selector: 'app-dashboard',
	templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
	public navItems:NavData[] = navItems;
	public sidebarMinimized = true;
	private changes: MutationObserver;
	public element: HTMLElement;

	constructor(@Inject(DOCUMENT) _document?: any, private Auth?:AuthenticationService) {
		this.changes = new MutationObserver((mutations) => {
			this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
		});
		this.element = _document.body;
		this.changes.observe(<Element>this.element, {
			attributes: true,
			attributeFilter: ['class']
		});
		this.navItems = this.Auth.NavigationItems;
	}

	ngOnInit(): void {
		
	}

	ngOnDestroy(): void {
		this.changes.disconnect();
	}
}
