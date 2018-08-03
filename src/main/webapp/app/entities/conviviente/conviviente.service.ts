import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConviviente } from 'app/shared/model/conviviente.model';

type EntityResponseType = HttpResponse<IConviviente>;
type EntityArrayResponseType = HttpResponse<IConviviente[]>;

@Injectable({ providedIn: 'root' })
export class ConvivienteService {
    private resourceUrl = SERVER_API_URL + 'api/convivientes';

    constructor(private http: HttpClient) {}

    create(conviviente: IConviviente): Observable<EntityResponseType> {
        return this.http.post<IConviviente>(this.resourceUrl, conviviente, { observe: 'response' });
    }

    update(conviviente: IConviviente): Observable<EntityResponseType> {
        return this.http.put<IConviviente>(this.resourceUrl, conviviente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IConviviente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IConviviente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
