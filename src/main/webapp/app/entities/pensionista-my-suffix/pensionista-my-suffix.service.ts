import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';

type EntityResponseType = HttpResponse<IPensionistaMySuffix>;
type EntityArrayResponseType = HttpResponse<IPensionistaMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PensionistaMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/pensionistas';

    constructor(private http: HttpClient) {}

    create(pensionista: IPensionistaMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pensionista);
        return this.http
            .post<IPensionistaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(pensionista: IPensionistaMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(pensionista);
        return this.http
            .put<IPensionistaMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPensionistaMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPensionistaMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(pensionista: IPensionistaMySuffix): IPensionistaMySuffix {
        const copy: IPensionistaMySuffix = Object.assign({}, pensionista, {
            fechaSolicitudPension:
                pensionista.fechaSolicitudPension != null && pensionista.fechaSolicitudPension.isValid()
                    ? pensionista.fechaSolicitudPension.format(DATE_FORMAT)
                    : null,
            fechaResolucionPension:
                pensionista.fechaResolucionPension != null && pensionista.fechaResolucionPension.isValid()
                    ? pensionista.fechaResolucionPension.format(DATE_FORMAT)
                    : null,
            fechaAltaNomina:
                pensionista.fechaAltaNomina != null && pensionista.fechaAltaNomina.isValid()
                    ? pensionista.fechaAltaNomina.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaSolicitudPension = res.body.fechaSolicitudPension != null ? moment(res.body.fechaSolicitudPension) : null;
        res.body.fechaResolucionPension = res.body.fechaResolucionPension != null ? moment(res.body.fechaResolucionPension) : null;
        res.body.fechaAltaNomina = res.body.fechaAltaNomina != null ? moment(res.body.fechaAltaNomina) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((pensionista: IPensionistaMySuffix) => {
            pensionista.fechaSolicitudPension =
                pensionista.fechaSolicitudPension != null ? moment(pensionista.fechaSolicitudPension) : null;
            pensionista.fechaResolucionPension =
                pensionista.fechaResolucionPension != null ? moment(pensionista.fechaResolucionPension) : null;
            pensionista.fechaAltaNomina = pensionista.fechaAltaNomina != null ? moment(pensionista.fechaAltaNomina) : null;
        });
        return res;
    }
}
