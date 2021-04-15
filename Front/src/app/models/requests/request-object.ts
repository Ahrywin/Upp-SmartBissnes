import { RequestBase } from './request-base';

export class RequestObject<T> extends RequestBase {
	public Content:T;
}
