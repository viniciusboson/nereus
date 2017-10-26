import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { PositionMetric } from './position-metric.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PositionMetricService {

    private resourceUrl = '/doris/api/position-metrics';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(positionMetric: PositionMetric): Observable<PositionMetric> {
        const copy = this.convert(positionMetric);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(positionMetric: PositionMetric): Observable<PositionMetric> {
        const copy = this.convert(positionMetric);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PositionMetric> {
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
     * Convert a returned JSON object to PositionMetric.
     */
    private convertItemFromServer(json: any): PositionMetric {
        const entity: PositionMetric = Object.assign(new PositionMetric(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a PositionMetric to a JSON which can be sent to the server.
     */
    private convert(positionMetric: PositionMetric): PositionMetric {
        const copy: PositionMetric = Object.assign({}, positionMetric);

        copy.createdAt = this.dateUtils.toDate(positionMetric.createdAt);

        copy.updatedAt = this.dateUtils.toDate(positionMetric.updatedAt);
        return copy;
    }
}
