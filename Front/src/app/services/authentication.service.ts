import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserData } from '../models/users/user-data';
import { NavData } from '../_nav';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private UserInfo: UserData = null;
	public NavigationItems: NavData[] = [];

	constructor(private router: Router, private location: Location) {
		this.NavigationItems = [
			{
				name: 'Dashboard',
				url: '/dashboard',
				icon: 'icon-speedometer',
				badge: {
					variant: 'info',
					text: 'NEW'
				}
			},
			{
				title: true,
				name: 'Usuarios'
			},
			{
				name: 'Nuevo Usuario',
				url: '/bank/tran/new',
				icon: 'icon-user'
			},
			{
				name: 'Gestionar Usuarios',
				url: '/bank/list',
				icon: 'icon-wrench'
			},
			{
				title: true,
				name: 'Ventas'
			},
			{
				name: 'Registrar Venta',
				url: '/bank/tran/new',
				icon: 'icon-pencil'
			},
			{
				title: true,
				name: 'Clientes'
			},
			{
				name: 'Registrar Cliente',
				url: '/bank/tran/new',
				icon: 'icon-pencil'
			},
			{
				name: 'Gestionar Clientes',
				url: '/bank/tran/new',
				icon: 'icon-wrench'
			},
			
		];
	}

	public GetSession(): UserData {
		return this.UserInfo;
	}

	private SetSession(data: UserData): void {
		this.UserInfo = data;
	}

	private ClearSession(): void {
		this.UserInfo = null;
	}

	public SessionStart(data: UserData): Promise<boolean> {
		this.SetSession(data);
		this.location.replaceState('/'); // clears browser history so they can't navigate with back button
		return this.router.navigate(["dashboard"]);
	}

	public SessionFinish(): Promise<boolean> {
		this.ClearSession();
		this.location.replaceState('/'); // clears browser history so they can't navigate with back button
		return this.router.navigate(["login"]);
	}

	public Validate(): void {
		if (this.GetSession() == null) {
			this.SessionFinish();
		} else {

		}
	}
}
