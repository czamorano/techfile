import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEtiologia } from 'app/shared/model/etiologia.model';
import { EtiologiaService } from './etiologia.service';
import { IPensionista } from 'app/shared/model/pensionista.model';
import { PensionistaService } from 'app/entities/pensionista';

@Component({
    selector: 'jhi-etiologia-update',
    templateUrl: './etiologia-update.component.html'
})
export class EtiologiaUpdateComponent implements OnInit {
    private _etiologia: IEtiologia;
    isSaving: boolean;

    pensionistas: IPensionista[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private etiologiaService: EtiologiaService,
        private pensionistaService: PensionistaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ etiologia }) => {
            this.etiologia = etiologia;
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
        if (this.etiologia.id !== undefined) {
            this.subscribeToSaveResponse(this.etiologiaService.update(this.etiologia));
        } else {
            this.subscribeToSaveResponse(this.etiologiaService.create(this.etiologia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEtiologia>>) {
        result.subscribe((res: HttpResponse<IEtiologia>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get etiologia() {
        return this._etiologia;
    }

    set etiologia(etiologia: IEtiologia) {
        this._etiologia = etiologia;
    }
}
