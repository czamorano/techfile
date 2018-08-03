import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';

type EntityResponseType = HttpResponse<IEtiologiaMySuffix>;
type EntityArrayResponseType = HttpResponse<IEtiologiaMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class EtiologiaMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/etiologias';

    constructor(private http: HttpClient) {}

    create(etiologia: IEtiologiaMySuffix): Observable<EntityResponseType> {
        return this.http.post<IEtiologiaMySuffix>(this.resourceUrl, etiologia, { observe: 'response' });
    }

    update(etiologia: IEtiologiaMySuffix): Observable<EntityResponseType> {
        return this.http.put<IEtiologiaMySuffix>(this.resourceUrl, etiologia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEtiologiaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEtiologiaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
