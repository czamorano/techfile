import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPensionConcurrente } from 'app/shared/model/pension-concurrente.model';
import { PensionConcurrenteService } from './pension-concurrente.service';

@Component({
    selector: 'jhi-pension-concurrente-update',
    templateUrl: './pension-concurrente-update.component.html'
})
export class PensionConcurrenteUpdateComponent implements OnInit {
    private _pensionConcurrente: IPensionConcurrente;
    isSaving: boolean;

    constructor(private pensionConcurrenteService: PensionConcurrenteService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pensionConcurrente }) => {
            this.pensionConcurrente = pensionConcurrente;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pensionConcurrente.id !== undefined) {
            this.subscribeToSaveResponse(this.pensionConcurrenteService.update(this.pensionConcurrente));
        } else {
            this.subscribeToSaveResponse(this.pensionConcurrenteService.create(this.pensionConcurrente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPensionConcurrente>>) {
        result.subscribe((res: HttpResponse<IPensionConcurrente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get pensionConcurrente() {
        return this._pensionConcurrente;
    }

    set pensionConcurrente(pensionConcurrente: IPensionConcurrente) {
        this._pensionConcurrente = pensionConcurrente;
    }
}
