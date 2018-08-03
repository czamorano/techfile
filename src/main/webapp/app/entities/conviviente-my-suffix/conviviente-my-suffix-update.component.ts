import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';
import { ConvivienteMySuffixService } from './conviviente-my-suffix.service';
import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from 'app/entities/pensionista-my-suffix';

@Component({
    selector: 'jhi-conviviente-my-suffix-update',
    templateUrl: './conviviente-my-suffix-update.component.html'
})
export class ConvivienteMySuffixUpdateComponent implements OnInit {
    private _conviviente: IConvivienteMySuffix;
    isSaving: boolean;

    pensionistas: IPensionistaMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private convivienteService: ConvivienteMySuffixService,
        private pensionistaService: PensionistaMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ conviviente }) => {
            this.conviviente = conviviente;
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
        if (this.conviviente.id !== undefined) {
            this.subscribeToSaveResponse(this.convivienteService.update(this.conviviente));
        } else {
            this.subscribeToSaveResponse(this.convivienteService.create(this.conviviente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConvivienteMySuffix>>) {
        result.subscribe((res: HttpResponse<IConvivienteMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get conviviente() {
        return this._conviviente;
    }

    set conviviente(conviviente: IConvivienteMySuffix) {
        this._conviviente = conviviente;
    }
}
