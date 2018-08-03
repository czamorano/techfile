import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';
import { DiscapacidadMySuffixService } from './discapacidad-my-suffix.service';
import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from 'app/entities/pensionista-my-suffix';

@Component({
    selector: 'jhi-discapacidad-my-suffix-update',
    templateUrl: './discapacidad-my-suffix-update.component.html'
})
export class DiscapacidadMySuffixUpdateComponent implements OnInit {
    private _discapacidad: IDiscapacidadMySuffix;
    isSaving: boolean;

    pensionistas: IPensionistaMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private discapacidadService: DiscapacidadMySuffixService,
        private pensionistaService: PensionistaMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ discapacidad }) => {
            this.discapacidad = discapacidad;
        });
        this.pensionistaService.query().subscribe(
            (res: HttpResponse<IPensionistaMySuffix[]>) => {
                this.pensionistas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.discapacidad.id !== undefined) {
            this.subscribeToSaveResponse(this.discapacidadService.update(this.discapacidad));
        } else {
            this.subscribeToSaveResponse(this.discapacidadService.create(this.discapacidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiscapacidadMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IDiscapacidadMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackPensionistaById(index: number, item: IPensionistaMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get discapacidad() {
        return this._discapacidad;
    }

    set discapacidad(discapacidad: IDiscapacidadMySuffix) {
        this._discapacidad = discapacidad;
    }
}
