import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';

type EntityResponseType = HttpResponse<IRegimenProcedencia>;
type EntityArrayResponseType = HttpResponse<IRegimenProcedencia[]>;

@Injectable({ providedIn: 'root' })
export class RegimenProcedenciaService {
    private resourceUrl = SERVER_API_URL + 'api/regimen-procedencias';

    constructor(private http: HttpClient) {}

    create(regimenProcedencia: IRegimenProcedencia): Observable<EntityResponseType> {
        return this.http.post<IRegimenProcedencia>(this.resourceUrl, regimenProcedencia, { observe: 'response' });
    }

    update(regimenProcedencia: IRegimenProcedencia): Observable<EntityResponseType> {
        return this.http.put<IRegimenProcedencia>(this.resourceUrl, regimenProcedencia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRegimenProcedencia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRegimenProcedencia[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
