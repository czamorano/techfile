import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAutonomia } from 'app/shared/model/autonomia.model';
import { AutonomiaService } from './autonomia.service';

@Component({
    selector: 'jhi-autonomia-update',
    templateUrl: './autonomia-update.component.html'
})
export class AutonomiaUpdateComponent implements OnInit {
    private _autonomia: IAutonomia;
    isSaving: boolean;

    constructor(private autonomiaService: AutonomiaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ autonomia }) => {
            this.autonomia = autonomia;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.autonomia.id !== undefined) {
            this.subscribeToSaveResponse(this.autonomiaService.update(this.autonomia));
        } else {
            this.subscribeToSaveResponse(this.autonomiaService.create(this.autonomia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAutonomia>>) {
        result.subscribe((res: HttpResponse<IAutonomia>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get autonomia() {
        return this._autonomia;
    }

    set autonomia(autonomia: IAutonomia) {
        this._autonomia = autonomia;
    }
}
