import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';

type EntityResponseType = HttpResponse<IProvinciaMySuffix>;
type EntityArrayResponseType = HttpResponse<IProvinciaMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ProvinciaMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/provincias';

    constructor(private http: HttpClient) {}

    create(provincia: IProvinciaMySuffix): Observable<EntityResponseType> {
        return this.http.post<IProvinciaMySuffix>(this.resourceUrl, provincia, { observe: 'response' });
    }

    update(provincia: IProvinciaMySuffix): Observable<EntityResponseType> {
        return this.http.put<IProvinciaMySuffix>(this.resourceUrl, provincia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProvinciaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProvinciaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
