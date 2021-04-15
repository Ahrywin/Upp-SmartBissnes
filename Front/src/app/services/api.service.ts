import { Injectable, isDevMode } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ResponseObject } from '../models/responses/response-object';
import { ResponseCodes } from '../enumerators/response-codes';
import { ResponseEmpty } from '../models/responses/response-empty';
import { UserData } from '../models/users/user-data';
import { RequestObject } from '../models/requests/request-object';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare var require: any;

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private IsDevMode: boolean = false;
	constructor(private http: HttpClient, private auth: AuthenticationService) {
		this.IsDevMode = isDevMode();
	}

	private GetUrl(url: string): string {
		if (url.startsWith("/")) url = url.substring(1);
		return `${environment.apiUrl}${url}`;
	};

	private Sign<T>(data: T): RequestObject<T> {
		let uuidv4: any = require('uuid/v4');
		
		let auth: UserData = this.auth.GetSession();
		let token: string = uuidv4();
		let signTxt: string = `[${auth.ID}][${token}][${auth.ApiKey}]`;
		let signSha: string = this.sha1(signTxt.toLowerCase());

		return {
			UserID: auth.ID,
			Token: token,
			Signature: signSha,
			Content: data
		};
	}

	public sha1(txt:string):string {
		return require('sha1')(txt);
	}

	public PostAndSign<result, content>(url: string, data?: content): Promise<ResponseObject<result>> {
		return new Promise<ResponseObject<result>>(async (resolver, rejecter) => {
			let request = this.Sign<content>(data);
			let response: ResponseObject<result> = null;

			try {
				response = await this.http.post<ResponseObject<result>>(this.GetUrl(url), request).toPromise();
			}
			catch (error) {
				resolver(this.onError(error));
			}

			if (response != null) {
				if (response.CodeNumber == ResponseCodes.Unauthorized) {
					this.auth.SessionFinish().finally(() => rejecter(response));
				} else if (response.CodeNumber == ResponseCodes.InternalServerError) {
					resolver(response);
				} else if (response.CodeNumber == ResponseCodes.NotImplemented) {
					response.Message = "Ha ocurrido un error desconocido, favor de notificar al administrador del sistema.";
					resolver(response);
				} else {
					resolver(response);
				}
			}
		});
	}

	public Post<result>(url: string, data: any): Promise<ResponseObject<result>> {
		return new Promise<ResponseObject<result>>(async (resolver, rejecter) => {
			let response: ResponseObject<result> = null;

			try {
				response = await this.http.post<ResponseObject<result>>(this.GetUrl(url), data).toPromise();
			}
			catch (error) {
				resolver(this.onError(error));
			}

			if (response != null) {
				if (response.CodeName == ResponseCodes.InternalServerError) {
					resolver(response);
				} else if (response.CodeName == ResponseCodes.NotImplemented) {
					response.Message = "Ha ocurrido un error desconocido, favor de notificar al administrador del sistema.";
					resolver(response);
				} else {
					resolver(response);
				}
			}
		});
	}

	public GetBadGatewayResponse(): ResponseEmpty {
		const result = new ResponseEmpty();
		result.CodeName = ResponseCodes.BadGateway;
		result.Message = "Ha ocurrido un error de comunicación, favor de verificar su conexión a internet.";
		result.ErrorNumber = 0;
		return result;
	}

	public onError(error: Error): any {
		if (this.IsDevMode) {
			console.error(error);
		}

		return this.GetBadGatewayResponse();
	}
}
