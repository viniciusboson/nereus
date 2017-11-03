import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Operation } from './operation.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OperationService {

    private resourceUrl = '/doris/api/operations';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(operation: Operation): Observable<Operation> {
        const copy = this.convert(operation);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(operation: Operation): Observable<Operation> {
        const copy = this.convert(operation);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Operation> {
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
     * Convert a returned JSON object to Operation.
     */
    private convertItemFromServer(json: any): Operation {
        const entity: Operation = Object.assign(new Operation(), json);
        entity.executedAt = this.dateUtils
            .convertDateTimeFromServer(json.executedAt);
        return entity;
    }

    /**
     * Convert a Operation to a JSON which can be sent to the server.
     */
    private convert(operation: Operation): Operation {
        const copy: Operation = Object.assign({}, operation);

        copy.executedAt = this.dateUtils.toDate(operation.executedAt);
        return copy;
    }
}
