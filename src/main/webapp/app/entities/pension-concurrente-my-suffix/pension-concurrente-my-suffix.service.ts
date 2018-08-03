import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';

type EntityResponseType = HttpResponse<IPensionConcurrenteMySuffix>;
type EntityArrayResponseType = HttpResponse<IPensionConcurrenteMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PensionConcurrenteMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/pension-concurrentes';

    constructor(private http: HttpClient) {}

    create(pensionConcurrente: IPensionConcurrenteMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPensionConcurrenteMySuffix>(this.resourceUrl, pensionConcurrente, { observe: 'response' });
    }

    update(pensionConcurrente: IPensionConcurrenteMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPensionConcurrenteMySuffix>(this.resourceUrl, pensionConcurrente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPensionConcurrenteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPensionConcurrenteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
