import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMesMySuffix } from 'app/shared/model/mes-my-suffix.model';

type EntityResponseType = HttpResponse<IMesMySuffix>;
type EntityArrayResponseType = HttpResponse<IMesMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class MesMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/mes';

    constructor(private http: HttpClient) {}

    create(mes: IMesMySuffix): Observable<EntityResponseType> {
        return this.http.post<IMesMySuffix>(this.resourceUrl, mes, { observe: 'response' });
    }

    update(mes: IMesMySuffix): Observable<EntityResponseType> {
        return this.http.put<IMesMySuffix>(this.resourceUrl, mes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
