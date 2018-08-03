import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';
import { RegimenProcedenciaMySuffixService } from './regimen-procedencia-my-suffix.service';

@Component({
    selector: 'jhi-regimen-procedencia-my-suffix-update',
    templateUrl: './regimen-procedencia-my-suffix-update.component.html'
})
export class RegimenProcedenciaMySuffixUpdateComponent implements OnInit {
    private _regimenProcedencia: IRegimenProcedenciaMySuffix;
    isSaving: boolean;

    constructor(private regimenProcedenciaService: RegimenProcedenciaMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ regimenProcedencia }) => {
            this.regimenProcedencia = regimenProcedencia;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.regimenProcedencia.id !== undefined) {
            this.subscribeToSaveResponse(this.regimenProcedenciaService.update(this.regimenProcedencia));
        } else {
            this.subscribeToSaveResponse(this.regimenProcedenciaService.create(this.regimenProcedencia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRegimenProcedenciaMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IRegimenProcedenciaMySuffix>) => this.onSaveSuccess(),
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
    get regimenProcedencia() {
        return this._regimenProcedencia;
    }

    set regimenProcedencia(regimenProcedencia: IRegimenProcedenciaMySuffix) {
        this._regimenProcedencia = regimenProcedencia;
    }
}
