import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';

type EntityResponseType = HttpResponse<IDiscapacidadMySuffix>;
type EntityArrayResponseType = HttpResponse<IDiscapacidadMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DiscapacidadMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/discapacidads';

    constructor(private http: HttpClient) {}

    create(discapacidad: IDiscapacidadMySuffix): Observable<EntityResponseType> {
        return this.http.post<IDiscapacidadMySuffix>(this.resourceUrl, discapacidad, { observe: 'response' });
    }

    update(discapacidad: IDiscapacidadMySuffix): Observable<EntityResponseType> {
        return this.http.put<IDiscapacidadMySuffix>(this.resourceUrl, discapacidad, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiscapacidadMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiscapacidadMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
