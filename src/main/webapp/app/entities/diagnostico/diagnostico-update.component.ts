import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiagnostico } from 'app/shared/model/diagnostico.model';
import { DiagnosticoService } from './diagnostico.service';
import { IPensionista } from 'app/shared/model/pensionista.model';
import { PensionistaService } from 'app/entities/pensionista';

@Component({
    selector: 'jhi-diagnostico-update',
    templateUrl: './diagnostico-update.component.html'
})
export class DiagnosticoUpdateComponent implements OnInit {
    private _diagnostico: IDiagnostico;
    isSaving: boolean;

    pensionistas: IPensionista[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private diagnosticoService: DiagnosticoService,
        private pensionistaService: PensionistaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            this.diagnostico = diagnostico;
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
        if (this.diagnostico.id !== undefined) {
            this.subscribeToSaveResponse(this.diagnosticoService.update(this.diagnostico));
        } else {
            this.subscribeToSaveResponse(this.diagnosticoService.create(this.diagnostico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnostico>>) {
        result.subscribe((res: HttpResponse<IDiagnostico>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get diagnostico() {
        return this._diagnostico;
    }

    set diagnostico(diagnostico: IDiagnostico) {
        this._diagnostico = diagnostico;
    }
}
