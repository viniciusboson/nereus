import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Transaction } from './transaction.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TransactionService {

    private resourceUrl = SERVER_API_URL + 'api/transactions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(transaction: Transaction): Observable<Transaction> {
        const copy = this.convert(transaction);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(transaction: Transaction): Observable<Transaction> {
        const copy = this.convert(transaction);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Transaction> {
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
     * Convert a returned JSON object to Transaction.
     */
    private convertItemFromServer(json: any): Transaction {
        const entity: Transaction = Object.assign(new Transaction(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a Transaction to a JSON which can be sent to the server.
     */
    private convert(transaction: Transaction): Transaction {
        const copy: Transaction = Object.assign({}, transaction);

        copy.createdAt = this.dateUtils.toDate(transaction.createdAt);

        copy.updatedAt = this.dateUtils.toDate(transaction.updatedAt);
        return copy;
    }
}
