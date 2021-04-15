import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserLogin } from '../models/users/user-login';
import { UserData } from '../models/users/user-data';
import { ResponseObject } from '../models/responses/response-object';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private api: ApiService) {
	}

	public Login(req: UserLogin): Promise<ResponseObject<UserData>> {
		return this.api.Post<UserData>("user/login", {
			UserName: req.UserName,
			Password: this.api.sha1(req.Password)
		});
	}
}
