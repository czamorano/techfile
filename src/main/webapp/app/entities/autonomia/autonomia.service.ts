import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAutonomia } from 'app/shared/model/autonomia.model';

type EntityResponseType = HttpResponse<IAutonomia>;
type EntityArrayResponseType = HttpResponse<IAutonomia[]>;

@Injectable({ providedIn: 'root' })
export class AutonomiaService {
    private resourceUrl = SERVER_API_URL + 'api/autonomias';

    constructor(private http: HttpClient) {}

    create(autonomia: IAutonomia): Observable<EntityResponseType> {
        return this.http.post<IAutonomia>(this.resourceUrl, autonomia, { observe: 'response' });
    }

    update(autonomia: IAutonomia): Observable<EntityResponseType> {
        return this.http.put<IAutonomia>(this.resourceUrl, autonomia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAutonomia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAutonomia[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
