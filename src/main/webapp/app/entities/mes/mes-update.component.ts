import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMes } from 'app/shared/model/mes.model';
import { MesService } from './mes.service';
import { IFichero } from 'app/shared/model/fichero.model';
import { FicheroService } from 'app/entities/fichero';

@Component({
    selector: 'jhi-mes-update',
    templateUrl: './mes-update.component.html'
})
export class MesUpdateComponent implements OnInit {
    private _mes: IMes;
    isSaving: boolean;

    ficheroes: IFichero[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mesService: MesService,
        private ficheroService: FicheroService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mes }) => {
            this.mes = mes;
        });
        this.ficheroService.query().subscribe(
            (res: HttpResponse<IFichero[]>) => {
                this.ficheroes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mes.id !== undefined) {
            this.subscribeToSaveResponse(this.mesService.update(this.mes));
        } else {
            this.subscribeToSaveResponse(this.mesService.create(this.mes));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMes>>) {
        result.subscribe((res: HttpResponse<IMes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFicheroById(index: number, item: IFichero) {
        return item.id;
    }
    get mes() {
        return this._mes;
    }

    set mes(mes: IMes) {
        this._mes = mes;
    }
}
