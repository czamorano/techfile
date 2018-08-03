import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';
import { TipoRelacionMySuffixService } from './tipo-relacion-my-suffix.service';

@Component({
    selector: 'jhi-tipo-relacion-my-suffix-update',
    templateUrl: './tipo-relacion-my-suffix-update.component.html'
})
export class TipoRelacionMySuffixUpdateComponent implements OnInit {
    private _tipoRelacion: ITipoRelacionMySuffix;
    isSaving: boolean;

    constructor(private tipoRelacionService: TipoRelacionMySuffixService, private activatedRoute: ActivatedRoute) {}

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

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRelacionMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ITipoRelacionMySuffix>) => this.onSaveSuccess(),
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
    get tipoRelacion() {
        return this._tipoRelacion;
    }

    set tipoRelacion(tipoRelacion: ITipoRelacionMySuffix) {
        this._tipoRelacion = tipoRelacion;
    }
}
