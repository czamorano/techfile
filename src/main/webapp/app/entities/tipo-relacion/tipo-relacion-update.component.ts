import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoRelacion } from 'app/shared/model/tipo-relacion.model';
import { TipoRelacionService } from './tipo-relacion.service';

@Component({
    selector: 'jhi-tipo-relacion-update',
    templateUrl: './tipo-relacion-update.component.html'
})
export class TipoRelacionUpdateComponent implements OnInit {
    private _tipoRelacion: ITipoRelacion;
    isSaving: boolean;

    constructor(private tipoRelacionService: TipoRelacionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoRelacion }) => {
            this.tipoRelacion = tipoRelacion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoRelacion.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoRelacionService.update(this.tipoRelacion));
        } else {
            this.subscribeToSaveResponse(this.tipoRelacionService.create(this.tipoRelacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRelacion>>) {
        result.subscribe((res: HttpResponse<ITipoRelacion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tipoRelacion() {
        return this._tipoRelacion;
    }

    set tipoRelacion(tipoRelacion: ITipoRelacion) {
        this._tipoRelacion = tipoRelacion;
    }
}
