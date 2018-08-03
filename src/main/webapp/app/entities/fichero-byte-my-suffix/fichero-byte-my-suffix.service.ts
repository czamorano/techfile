import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';

type EntityResponseType = HttpResponse<IFicheroByteMySuffix>;
type EntityArrayResponseType = HttpResponse<IFicheroByteMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class FicheroByteMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/fichero-bytes';

    constructor(private http: HttpClient) {}

    create(ficheroByte: IFicheroByteMySuffix): Observable<EntityResponseType> {
        return this.http.post<IFicheroByteMySuffix>(this.resourceUrl, ficheroByte, { observe: 'response' });
    }

    update(ficheroByte: IFicheroByteMySuffix): Observable<EntityResponseType> {
        return this.http.put<IFicheroByteMySuffix>(this.resourceUrl, ficheroByte, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFicheroByteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFicheroByteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
