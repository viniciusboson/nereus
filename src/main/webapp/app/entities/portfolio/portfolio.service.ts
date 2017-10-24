import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Portfolio } from './portfolio.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PortfolioService {

    private resourceUrl = '/doris/api/portfolios';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(portfolio: Portfolio): Observable<Portfolio> {
        const copy = this.convert(portfolio);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(portfolio: Portfolio): Observable<Portfolio> {
        const copy = this.convert(portfolio);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Portfolio> {
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
     * Convert a returned JSON object to Portfolio.
     */
    private convertItemFromServer(json: any): Portfolio {
        const entity: Portfolio = Object.assign(new Portfolio(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a Portfolio to a JSON which can be sent to the server.
     */
    private convert(portfolio: Portfolio): Portfolio {
        const copy: Portfolio = Object.assign({}, portfolio);

        copy.createdAt = this.dateUtils.toDate(portfolio.createdAt);

        copy.updatedAt = this.dateUtils.toDate(portfolio.updatedAt);
        return copy;
    }
}
