import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProvincia } from 'app/shared/model/provincia.model';
import { ProvinciaService } from './provincia.service';
import { IAutonomia } from 'app/shared/model/autonomia.model';
import { AutonomiaService } from 'app/entities/autonomia';

@Component({
    selector: 'jhi-provincia-update',
    templateUrl: './provincia-update.component.html'
})
export class ProvinciaUpdateComponent implements OnInit {
    private _provincia: IProvincia;
    isSaving: boolean;

    autonomias: IAutonomia[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private provinciaService: ProvinciaService,
        private autonomiaService: AutonomiaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ provincia }) => {
            this.provincia = provincia;
        });
        this.autonomiaService.query().subscribe(
            (res: HttpResponse<IAutonomia[]>) => {
                this.autonomias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.provincia.id !== undefined) {
            this.subscribeToSaveResponse(this.provinciaService.update(this.provincia));
        } else {
            this.subscribeToSaveResponse(this.provinciaService.create(this.provincia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProvincia>>) {
        result.subscribe((res: HttpResponse<IProvincia>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAutonomiaById(index: number, item: IAutonomia) {
        return item.id;
    }
    get provincia() {
        return this._provincia;
    }

    set provincia(provincia: IProvincia) {
        this._provincia = provincia;
    }
}
