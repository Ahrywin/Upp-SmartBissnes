import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseObject } from '../models/responses/response-object';
import { CardLevelData } from '../models/collections/card-level-data';
import { CompanyData } from '../models/collections/company-data';
import { StoreData } from '../models/collections/store-data';
import { PromoData } from '../models/collections/promo-data';

@Injectable({
	providedIn: 'root'
})
export class CollectionService {
	private CardLevelsList: CardLevelData[] = [];
	private CompaniesList:CompanyData[] = [];

	constructor(private api: ApiService) {
	}

	public async FetchCardLevels(): Promise<CardLevelData[]> {
		if (this.CardLevelsList.length == 0) {
			this.CardLevelsList = (await this.api.PostAndSign<CardLevelData[], any>("collection/cardlevels", null)).Result;
		}
		return this.CardLevelsList;
	}

	public async FetchCompanies(): Promise<CompanyData[]> {
		if (this.CompaniesList.length == 0) {
			this.CompaniesList = (await this.api.PostAndSign<CompanyData[], any>("collection/companies", null)).Result;
		}
		return this.CompaniesList;
	}

	public async FetchStores(id:string): Promise<StoreData[]> {
		return (await this.api.PostAndSign<StoreData[], string>("collection/stores", id)).Result;
	}

	public async FetchPromotions(id:string): Promise<PromoData[]> {
		return (await this.api.PostAndSign<PromoData[], string>("collection/promotions", id)).Result;
	}
}
