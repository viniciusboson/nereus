import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Accounts } from './accounts.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AccountsService {

    private resourceUrl = SERVER_API_URL + 'api/accounts';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(accounts: Accounts): Observable<Accounts> {
        const copy = this.convert(accounts);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(accounts: Accounts): Observable<Accounts> {
        const copy = this.convert(accounts);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Accounts> {
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
     * Convert a returned JSON object to Accounts.
     */
    private convertItemFromServer(json: any): Accounts {
        const entity: Accounts = Object.assign(new Accounts(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a Accounts to a JSON which can be sent to the server.
     */
    private convert(accounts: Accounts): Accounts {
        const copy: Accounts = Object.assign({}, accounts);

        copy.createdAt = this.dateUtils.toDate(accounts.createdAt);

        copy.updatedAt = this.dateUtils.toDate(accounts.updatedAt);
        return copy;
    }
}
