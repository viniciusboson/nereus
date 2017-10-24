import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Position } from './position.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PositionService {

    private resourceUrl = '/doris/api/positions';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(position: Position): Observable<Position> {
        const copy = this.convert(position);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(position: Position): Observable<Position> {
        const copy = this.convert(position);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Position> {
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
     * Convert a returned JSON object to Position.
     */
    private convertItemFromServer(json: any): Position {
        const entity: Position = Object.assign(new Position(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a Position to a JSON which can be sent to the server.
     */
    private convert(position: Position): Position {
        const copy: Position = Object.assign({}, position);

        copy.createdAt = this.dateUtils.toDate(position.createdAt);

        copy.updatedAt = this.dateUtils.toDate(position.updatedAt);
        return copy;
    }
}
