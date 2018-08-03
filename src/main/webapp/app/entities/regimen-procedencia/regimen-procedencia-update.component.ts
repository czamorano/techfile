import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';
import { RegimenProcedenciaService } from './regimen-procedencia.service';

@Component({
    selector: 'jhi-regimen-procedencia-update',
    templateUrl: './regimen-procedencia-update.component.html'
})
export class RegimenProcedenciaUpdateComponent implements OnInit {
    private _regimenProcedencia: IRegimenProcedencia;
    isSaving: boolean;

    constructor(private regimenProcedenciaService: RegimenProcedenciaService, private activatedRoute: ActivatedRoute) {}

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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRegimenProcedencia>>) {
        result.subscribe((res: HttpResponse<IRegimenProcedencia>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    set regimenProcedencia(regimenProcedencia: IRegimenProcedencia) {
        this._regimenProcedencia = regimenProcedencia;
    }
}
