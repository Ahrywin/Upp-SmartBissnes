import { ResponseCodes } from "../enumerators/response-codes";

export interface IResponse {
	CodeName:ResponseCodes;
	CodeNumber:Number;
	Message:String;
	ErrorNumber:Number;
}
