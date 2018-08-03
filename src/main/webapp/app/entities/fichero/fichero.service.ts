import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFichero } from 'app/shared/model/fichero.model';

type EntityResponseType = HttpResponse<IFichero>;
type EntityArrayResponseType = HttpResponse<IFichero[]>;

@Injectable({ providedIn: 'root' })
export class FicheroService {
    private resourceUrl = SERVER_API_URL + 'api/ficheroes';

    constructor(private http: HttpClient) {}

    create(fichero: IFichero): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fichero);
        return this.http
            .post<IFichero>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fichero: IFichero): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fichero);
        return this.http
            .put<IFichero>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFichero>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFichero[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(fichero: IFichero): IFichero {
        const copy: IFichero = Object.assign({}, fichero, {
            fechaCreacionOrigen:
                fichero.fechaCreacionOrigen != null && fichero.fechaCreacionOrigen.isValid()
                    ? fichero.fechaCreacionOrigen.format(DATE_FORMAT)
                    : null,
            fechaAltaAplicacion:
                fichero.fechaAltaAplicacion != null && fichero.fechaAltaAplicacion.isValid()
                    ? fichero.fechaAltaAplicacion.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaCreacionOrigen = res.body.fechaCreacionOrigen != null ? moment(res.body.fechaCreacionOrigen) : null;
        res.body.fechaAltaAplicacion = res.body.fechaAltaAplicacion != null ? moment(res.body.fechaAltaAplicacion) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fichero: IFichero) => {
            fichero.fechaCreacionOrigen = fichero.fechaCreacionOrigen != null ? moment(fichero.fechaCreacionOrigen) : null;
            fichero.fechaAltaAplicacion = fichero.fechaAltaAplicacion != null ? moment(fichero.fechaAltaAplicacion) : null;
        });
        return res;
    }
}
