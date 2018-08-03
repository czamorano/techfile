import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';

type EntityResponseType = HttpResponse<ITipoRelacionMySuffix>;
type EntityArrayResponseType = HttpResponse<ITipoRelacionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TipoRelacionMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/tipo-relacions';

    constructor(private http: HttpClient) {}

    create(tipoRelacion: ITipoRelacionMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITipoRelacionMySuffix>(this.resourceUrl, tipoRelacion, { observe: 'response' });
    }

    update(tipoRelacion: ITipoRelacionMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITipoRelacionMySuffix>(this.resourceUrl, tipoRelacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoRelacionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoRelacionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
