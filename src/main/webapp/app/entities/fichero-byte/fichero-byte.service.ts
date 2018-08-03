import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheroByte } from 'app/shared/model/fichero-byte.model';

type EntityResponseType = HttpResponse<IFicheroByte>;
type EntityArrayResponseType = HttpResponse<IFicheroByte[]>;

@Injectable({ providedIn: 'root' })
export class FicheroByteService {
    private resourceUrl = SERVER_API_URL + 'api/fichero-bytes';

    constructor(private http: HttpClient) {}

    create(ficheroByte: IFicheroByte): Observable<EntityResponseType> {
        return this.http.post<IFicheroByte>(this.resourceUrl, ficheroByte, { observe: 'response' });
    }

    update(ficheroByte: IFicheroByte): Observable<EntityResponseType> {
        return this.http.put<IFicheroByte>(this.resourceUrl, ficheroByte, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFicheroByte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFicheroByte[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
