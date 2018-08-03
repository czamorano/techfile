import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITipoRelacion } from 'app/shared/model/tipo-relacion.model';

type EntityResponseType = HttpResponse<ITipoRelacion>;
type EntityArrayResponseType = HttpResponse<ITipoRelacion[]>;

@Injectable({ providedIn: 'root' })
export class TipoRelacionService {
    private resourceUrl = SERVER_API_URL + 'api/tipo-relacions';

    constructor(private http: HttpClient) {}

    create(tipoRelacion: ITipoRelacion): Observable<EntityResponseType> {
        return this.http.post<ITipoRelacion>(this.resourceUrl, tipoRelacion, { observe: 'response' });
    }

    update(tipoRelacion: ITipoRelacion): Observable<EntityResponseType> {
        return this.http.put<ITipoRelacion>(this.resourceUrl, tipoRelacion, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITipoRelacion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITipoRelacion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
