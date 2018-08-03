import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';

type EntityResponseType = HttpResponse<IPerceptorMySuffix>;
type EntityArrayResponseType = HttpResponse<IPerceptorMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PerceptorMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/perceptors';

    constructor(private http: HttpClient) {}

    create(perceptor: IPerceptorMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPerceptorMySuffix>(this.resourceUrl, perceptor, { observe: 'response' });
    }

    update(perceptor: IPerceptorMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPerceptorMySuffix>(this.resourceUrl, perceptor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerceptorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerceptorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
