import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEtiologia } from 'app/shared/model/etiologia.model';

type EntityResponseType = HttpResponse<IEtiologia>;
type EntityArrayResponseType = HttpResponse<IEtiologia[]>;

@Injectable({ providedIn: 'root' })
export class EtiologiaService {
    private resourceUrl = SERVER_API_URL + 'api/etiologias';

    constructor(private http: HttpClient) {}

    create(etiologia: IEtiologia): Observable<EntityResponseType> {
        return this.http.post<IEtiologia>(this.resourceUrl, etiologia, { observe: 'response' });
    }

    update(etiologia: IEtiologia): Observable<EntityResponseType> {
        return this.http.put<IEtiologia>(this.resourceUrl, etiologia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEtiologia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEtiologia[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
