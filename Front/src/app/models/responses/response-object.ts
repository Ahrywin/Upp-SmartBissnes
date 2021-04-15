import { ResponseBase } from "./response-base";
import { ResponseEmpty } from "./response-empty";

export class ResponseObject<T> extends ResponseBase  {
	public Result:T = null;
	
	public ToResponseEmpty():ResponseEmpty {
		let result = new ResponseEmpty();
		result.CodeName = this.CodeName;
		result.ErrorNumber = this.ErrorNumber;
		result.Message = this.Message;
		return result;
	}
}
