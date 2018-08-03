import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';

type EntityResponseType = HttpResponse<IUsuarioMySuffix>;
type EntityArrayResponseType = HttpResponse<IUsuarioMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/usuarios';

    constructor(private http: HttpClient) {}

    create(usuario: IUsuarioMySuffix): Observable<EntityResponseType> {
        return this.http.post<IUsuarioMySuffix>(this.resourceUrl, usuario, { observe: 'response' });
    }

    update(usuario: IUsuarioMySuffix): Observable<EntityResponseType> {
        return this.http.put<IUsuarioMySuffix>(this.resourceUrl, usuario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsuarioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
