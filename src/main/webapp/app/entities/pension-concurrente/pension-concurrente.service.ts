import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPensionConcurrente } from 'app/shared/model/pension-concurrente.model';

type EntityResponseType = HttpResponse<IPensionConcurrente>;
type EntityArrayResponseType = HttpResponse<IPensionConcurrente[]>;

@Injectable({ providedIn: 'root' })
export class PensionConcurrenteService {
    private resourceUrl = SERVER_API_URL + 'api/pension-concurrentes';

    constructor(private http: HttpClient) {}

    create(pensionConcurrente: IPensionConcurrente): Observable<EntityResponseType> {
        return this.http.post<IPensionConcurrente>(this.resourceUrl, pensionConcurrente, { observe: 'response' });
    }

    update(pensionConcurrente: IPensionConcurrente): Observable<EntityResponseType> {
        return this.http.put<IPensionConcurrente>(this.resourceUrl, pensionConcurrente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPensionConcurrente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPensionConcurrente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
