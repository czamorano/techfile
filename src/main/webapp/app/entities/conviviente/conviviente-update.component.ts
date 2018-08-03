import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConviviente } from 'app/shared/model/conviviente.model';
import { ConvivienteService } from './conviviente.service';
import { IPensionista } from 'app/shared/model/pensionista.model';
import { PensionistaService } from 'app/entities/pensionista';

@Component({
    selector: 'jhi-conviviente-update',
    templateUrl: './conviviente-update.component.html'
})
export class ConvivienteUpdateComponent implements OnInit {
    private _conviviente: IConviviente;
    isSaving: boolean;

    pensionistas: IPensionista[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private convivienteService: ConvivienteService,
        private pensionistaService: PensionistaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ conviviente }) => {
            this.conviviente = conviviente;
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
        if (this.conviviente.id !== undefined) {
            this.subscribeToSaveResponse(this.convivienteService.update(this.conviviente));
        } else {
            this.subscribeToSaveResponse(this.convivienteService.create(this.conviviente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConviviente>>) {
        result.subscribe((res: HttpResponse<IConviviente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get conviviente() {
        return this._conviviente;
    }

    set conviviente(conviviente: IConviviente) {
        this._conviviente = conviviente;
    }
}
