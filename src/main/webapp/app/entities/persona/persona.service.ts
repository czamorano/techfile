import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersona } from 'app/shared/model/persona.model';

type EntityResponseType = HttpResponse<IPersona>;
type EntityArrayResponseType = HttpResponse<IPersona[]>;

@Injectable({ providedIn: 'root' })
export class PersonaService {
    private resourceUrl = SERVER_API_URL + 'api/personas';

    constructor(private http: HttpClient) {}

    create(persona: IPersona): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persona);
        return this.http
            .post<IPersona>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(persona: IPersona): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persona);
        return this.http
            .put<IPersona>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPersona>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersona[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(persona: IPersona): IPersona {
        const copy: IPersona = Object.assign({}, persona, {
            fechaNacimiento:
                persona.fechaNacimiento != null && persona.fechaNacimiento.isValid() ? persona.fechaNacimiento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((persona: IPersona) => {
            persona.fechaNacimiento = persona.fechaNacimiento != null ? moment(persona.fechaNacimiento) : null;
        });
        return res;
    }
}
