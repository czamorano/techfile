import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';
import { PensionConcurrenteMySuffixService } from './pension-concurrente-my-suffix.service';

@Component({
    selector: 'jhi-pension-concurrente-my-suffix-update',
    templateUrl: './pension-concurrente-my-suffix-update.component.html'
})
export class PensionConcurrenteMySuffixUpdateComponent implements OnInit {
    private _pensionConcurrente: IPensionConcurrenteMySuffix;
    isSaving: boolean;

    constructor(private pensionConcurrenteService: PensionConcurrenteMySuffixService, private activatedRoute: ActivatedRoute) {}

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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPensionConcurrenteMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IPensionConcurrenteMySuffix>) => this.onSaveSuccess(),
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
    get pensionConcurrente() {
        return this._pensionConcurrente;
    }

    set pensionConcurrente(pensionConcurrente: IPensionConcurrenteMySuffix) {
        this._pensionConcurrente = pensionConcurrente;
    }
}
