import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Charge } from './charge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ChargeService {

    private resourceUrl = '/doris/api/charges';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(charge: Charge): Observable<Charge> {
        const copy = this.convert(charge);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(charge: Charge): Observable<Charge> {
        const copy = this.convert(charge);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Charge> {
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
     * Convert a returned JSON object to Charge.
     */
    private convertItemFromServer(json: any): Charge {
        const entity: Charge = Object.assign(new Charge(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a Charge to a JSON which can be sent to the server.
     */
    private convert(charge: Charge): Charge {
        const copy: Charge = Object.assign({}, charge);

        copy.createdAt = this.dateUtils.toDate(charge.createdAt);

        copy.updatedAt = this.dateUtils.toDate(charge.updatedAt);
        return copy;
    }
}
