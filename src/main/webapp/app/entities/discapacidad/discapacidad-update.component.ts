import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiscapacidad } from 'app/shared/model/discapacidad.model';
import { DiscapacidadService } from './discapacidad.service';
import { IPensionista } from 'app/shared/model/pensionista.model';
import { PensionistaService } from 'app/entities/pensionista';

@Component({
    selector: 'jhi-discapacidad-update',
    templateUrl: './discapacidad-update.component.html'
})
export class DiscapacidadUpdateComponent implements OnInit {
    private _discapacidad: IDiscapacidad;
    isSaving: boolean;

    pensionistas: IPensionista[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private discapacidadService: DiscapacidadService,
        private pensionistaService: PensionistaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ discapacidad }) => {
            this.discapacidad = discapacidad;
        });
        this.pensionistaService.query().subscribe(
            (res: HttpResponse<IPensionista[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiscapacidad>>) {
        result.subscribe((res: HttpResponse<IDiscapacidad>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPensionistaById(index: number, item: IPensionista) {
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

    set discapacidad(discapacidad: IDiscapacidad) {
        this._discapacidad = discapacidad;
    }
}
