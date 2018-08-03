import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';

type EntityResponseType = HttpResponse<IRegimenProcedenciaMySuffix>;
type EntityArrayResponseType = HttpResponse<IRegimenProcedenciaMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RegimenProcedenciaMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/regimen-procedencias';

    constructor(private http: HttpClient) {}

    create(regimenProcedencia: IRegimenProcedenciaMySuffix): Observable<EntityResponseType> {
        return this.http.post<IRegimenProcedenciaMySuffix>(this.resourceUrl, regimenProcedencia, { observe: 'response' });
    }

    update(regimenProcedencia: IRegimenProcedenciaMySuffix): Observable<EntityResponseType> {
        return this.http.put<IRegimenProcedenciaMySuffix>(this.resourceUrl, regimenProcedencia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRegimenProcedenciaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRegimenProcedenciaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
