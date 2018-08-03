import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';

type EntityResponseType = HttpResponse<IConvivienteMySuffix>;
type EntityArrayResponseType = HttpResponse<IConvivienteMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ConvivienteMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/convivientes';

    constructor(private http: HttpClient) {}

    create(conviviente: IConvivienteMySuffix): Observable<EntityResponseType> {
        return this.http.post<IConvivienteMySuffix>(this.resourceUrl, conviviente, { observe: 'response' });
    }

    update(conviviente: IConvivienteMySuffix): Observable<EntityResponseType> {
        return this.http.put<IConvivienteMySuffix>(this.resourceUrl, conviviente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IConvivienteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IConvivienteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
