import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMesMySuffix } from 'app/shared/model/mes-my-suffix.model';
import { MesMySuffixService } from './mes-my-suffix.service';
import { IFicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';
import { FicheroMySuffixService } from 'app/entities/fichero-my-suffix';

@Component({
    selector: 'jhi-mes-my-suffix-update',
    templateUrl: './mes-my-suffix-update.component.html'
})
export class MesMySuffixUpdateComponent implements OnInit {
    private _mes: IMesMySuffix;
    isSaving: boolean;

    ficheroes: IFicheroMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private mesService: MesMySuffixService,
        private ficheroService: FicheroMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mes }) => {
            this.mes = mes;
        });
        this.ficheroService.query().subscribe(
            (res: HttpResponse<IFicheroMySuffix[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMesMySuffix>>) {
        result.subscribe((res: HttpResponse<IMesMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFicheroById(index: number, item: IFicheroMySuffix) {
        return item.id;
    }
    get mes() {
        return this._mes;
    }

    set mes(mes: IMesMySuffix) {
        this._mes = mes;
    }
}
