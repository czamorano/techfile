import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerceptor } from 'app/shared/model/perceptor.model';

type EntityResponseType = HttpResponse<IPerceptor>;
type EntityArrayResponseType = HttpResponse<IPerceptor[]>;

@Injectable({ providedIn: 'root' })
export class PerceptorService {
    private resourceUrl = SERVER_API_URL + 'api/perceptors';

    constructor(private http: HttpClient) {}

    create(perceptor: IPerceptor): Observable<EntityResponseType> {
        return this.http.post<IPerceptor>(this.resourceUrl, perceptor, { observe: 'response' });
    }

    update(perceptor: IPerceptor): Observable<EntityResponseType> {
        return this.http.put<IPerceptor>(this.resourceUrl, perceptor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerceptor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerceptor[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
