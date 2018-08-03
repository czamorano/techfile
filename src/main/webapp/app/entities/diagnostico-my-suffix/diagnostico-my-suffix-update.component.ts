import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';
import { DiagnosticoMySuffixService } from './diagnostico-my-suffix.service';
import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from 'app/entities/pensionista-my-suffix';

@Component({
    selector: 'jhi-diagnostico-my-suffix-update',
    templateUrl: './diagnostico-my-suffix-update.component.html'
})
export class DiagnosticoMySuffixUpdateComponent implements OnInit {
    private _diagnostico: IDiagnosticoMySuffix;
    isSaving: boolean;

    pensionistas: IPensionistaMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private diagnosticoService: DiagnosticoMySuffixService,
        private pensionistaService: PensionistaMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            this.diagnostico = diagnostico;
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
        if (this.diagnostico.id !== undefined) {
            this.subscribeToSaveResponse(this.diagnosticoService.update(this.diagnostico));
        } else {
            this.subscribeToSaveResponse(this.diagnosticoService.create(this.diagnostico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnosticoMySuffix>>) {
        result.subscribe((res: HttpResponse<IDiagnosticoMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get diagnostico() {
        return this._diagnostico;
    }

    set diagnostico(diagnostico: IDiagnosticoMySuffix) {
        this._diagnostico = diagnostico;
    }
}
