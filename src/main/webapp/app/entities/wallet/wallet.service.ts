import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Wallet } from './wallet.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WalletService {

    private resourceUrl = SERVER_API_URL + 'api/wallets';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(wallet: Wallet): Observable<Wallet> {
        const copy = this.convert(wallet);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(wallet: Wallet): Observable<Wallet> {
        const copy = this.convert(wallet);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Wallet> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Wallet.
     */
    private convertItemFromServer(json: any): Wallet {
        const entity: Wallet = Object.assign(new Wallet(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a Wallet to a JSON which can be sent to the server.
     */
    private convert(wallet: Wallet): Wallet {
        const copy: Wallet = Object.assign({}, wallet);

        copy.createdAt = this.dateUtils.toDate(wallet.createdAt);

        copy.updatedAt = this.dateUtils.toDate(wallet.updatedAt);
        return copy;
    }
}
