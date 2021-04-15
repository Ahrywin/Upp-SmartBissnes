import { IResponse } from "../../interfaces/iresponse";
import { ResponseCodes } from "../../enumerators/response-codes";

export abstract class ResponseBase implements IResponse {
	public CodeName:ResponseCodes = ResponseCodes.Unauthorized;
	public Message:string = null;
	public ErrorNumber:number = null;

	get CodeNumber():number {
		return this.CodeName;
	}

	set CodeNumber(value:number) {
		this.CodeName = ResponseCodes[value.toString()];
	}
}
