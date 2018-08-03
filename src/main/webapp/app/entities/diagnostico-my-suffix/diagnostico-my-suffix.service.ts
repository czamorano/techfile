import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';

type EntityResponseType = HttpResponse<IDiagnosticoMySuffix>;
type EntityArrayResponseType = HttpResponse<IDiagnosticoMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DiagnosticoMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/diagnosticos';

    constructor(private http: HttpClient) {}

    create(diagnostico: IDiagnosticoMySuffix): Observable<EntityResponseType> {
        return this.http.post<IDiagnosticoMySuffix>(this.resourceUrl, diagnostico, { observe: 'response' });
    }

    update(diagnostico: IDiagnosticoMySuffix): Observable<EntityResponseType> {
        return this.http.put<IDiagnosticoMySuffix>(this.resourceUrl, diagnostico, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiagnosticoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiagnosticoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
