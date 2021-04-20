import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLogin } from '../../models/users/user-login';
import { AlertComponent } from '../../components/alert/alert.component';
import { UserService } from '../../services/user.service';
import { ResponseCodes } from '../../enumerators/response-codes';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
	@ViewChild(AlertComponent, { static: false }) Alert: AlertComponent;
	public isLoading: boolean = false;
	public LoginData: UserLogin = new UserLogin();
	constructor(private user: UserService, private auth: AuthenticationService) {

	}
	ngOnInit(): void {

	}
	public IsLoading() {

		return this.isLoading;

	}

	public async onSubmit(e: Event) {
		e.preventDefault();

		if (this.LoginData.UserName == "") {
			this.Alert.ShowAlert("El correo electrónico es requerido.");
		} else if (this.LoginData.Password == "") {
			this.Alert.ShowAlert("La contraseña es requerida.");
		} else {
			this.Alert.Hide();
			this.isLoading = true;
			let response = await this.user.Login(this.LoginData);
			this.isLoading = false;

			if (response.CodeNumber == ResponseCodes.Found) {
				await this.auth.SessionStart(response.Result);
			} else if (response.CodeNumber == ResponseCodes.NotFound) {
				this.Alert.ShowError("Datos de Acceso Incorrectos.");
			} else {
				this.Alert.ShowError(response.Message);
			}

		}
	}
}
