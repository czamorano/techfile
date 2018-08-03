import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';
import { ProvinciaMySuffixService } from './provincia-my-suffix.service';
import { IAutonomiaMySuffix } from 'app/shared/model/autonomia-my-suffix.model';
import { AutonomiaMySuffixService } from 'app/entities/autonomia-my-suffix';

@Component({
    selector: 'jhi-provincia-my-suffix-update',
    templateUrl: './provincia-my-suffix-update.component.html'
})
export class ProvinciaMySuffixUpdateComponent implements OnInit {
    private _provincia: IProvinciaMySuffix;
    isSaving: boolean;

    autonomias: IAutonomiaMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private provinciaService: ProvinciaMySuffixService,
        private autonomiaService: AutonomiaMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ provincia }) => {
            this.provincia = provincia;
        });
        this.autonomiaService.query().subscribe(
            (res: HttpResponse<IAutonomiaMySuffix[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProvinciaMySuffix>>) {
        result.subscribe((res: HttpResponse<IProvinciaMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAutonomiaById(index: number, item: IAutonomiaMySuffix) {
        return item.id;
    }
    get provincia() {
        return this._provincia;
    }

    set provincia(provincia: IProvinciaMySuffix) {
        this._provincia = provincia;
    }
}
