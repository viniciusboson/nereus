import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Institution } from './institution.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InstitutionService {

    private resourceUrl = '/doris/api/institutions';

    constructor(private http: Http) { }

    create(institution: Institution): Observable<Institution> {
        const copy = this.convert(institution);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(institution: Institution): Observable<Institution> {
        const copy = this.convert(institution);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Institution> {
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
     * Convert a returned JSON object to Institution.
     */
    private convertItemFromServer(json: any): Institution {
        const entity: Institution = Object.assign(new Institution(), json);
        return entity;
    }

    /**
     * Convert a Institution to a JSON which can be sent to the server.
     */
    private convert(institution: Institution): Institution {
        const copy: Institution = Object.assign({}, institution);
        return copy;
    }
}
