import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';
import { EtiologiaMySuffixService } from './etiologia-my-suffix.service';
import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from 'app/entities/pensionista-my-suffix';

@Component({
    selector: 'jhi-etiologia-my-suffix-update',
    templateUrl: './etiologia-my-suffix-update.component.html'
})
export class EtiologiaMySuffixUpdateComponent implements OnInit {
    private _etiologia: IEtiologiaMySuffix;
    isSaving: boolean;

    pensionistas: IPensionistaMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private etiologiaService: EtiologiaMySuffixService,
        private pensionistaService: PensionistaMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ etiologia }) => {
            this.etiologia = etiologia;
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
        if (this.etiologia.id !== undefined) {
            this.subscribeToSaveResponse(this.etiologiaService.update(this.etiologia));
        } else {
            this.subscribeToSaveResponse(this.etiologiaService.create(this.etiologia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEtiologiaMySuffix>>) {
        result.subscribe((res: HttpResponse<IEtiologiaMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get etiologia() {
        return this._etiologia;
    }

    set etiologia(etiologia: IEtiologiaMySuffix) {
        this._etiologia = etiologia;
    }
}
