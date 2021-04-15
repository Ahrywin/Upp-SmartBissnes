import { IRequest } from '../../interfaces/irequest';

export abstract class RequestBase implements IRequest {
	public UserID:string;
	public Token:string;
	public Signature:string
}