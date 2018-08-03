import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';
import { FicheroMySuffixService } from './fichero-my-suffix.service';
import { IFicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';
import { FicheroByteMySuffixService } from 'app/entities/fichero-byte-my-suffix';
import { IAutonomiaMySuffix } from 'app/shared/model/autonomia-my-suffix.model';
import { AutonomiaMySuffixService } from 'app/entities/autonomia-my-suffix';
import { IProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';
import { ProvinciaMySuffixService } from 'app/entities/provincia-my-suffix';

@Component({
    selector: 'jhi-fichero-my-suffix-update',
    templateUrl: './fichero-my-suffix-update.component.html'
})
export class FicheroMySuffixUpdateComponent implements OnInit {
    private _fichero: IFicheroMySuffix;
    isSaving: boolean;

    ficherobytes: IFicheroByteMySuffix[];

    autonomias: IAutonomiaMySuffix[];

    provincias: IProvinciaMySuffix[];
    fechaCreacionOrigenDp: any;
    fechaAltaAplicacionDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ficheroService: FicheroMySuffixService,
        private ficheroByteService: FicheroByteMySuffixService,
        private autonomiaService: AutonomiaMySuffixService,
        private provinciaService: ProvinciaMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fichero }) => {
            this.fichero = fichero;
        });
        this.ficheroByteService.query({ filter: 'fichero-is-null' }).subscribe(
            (res: HttpResponse<IFicheroByteMySuffix[]>) => {
                if (!this.fichero.ficheroByte || !this.fichero.ficheroByte.id) {
                    this.ficherobytes = res.body;
                } else {
                    this.ficheroByteService.find(this.fichero.ficheroByte.id).subscribe(
                        (subRes: HttpResponse<IFicheroByteMySuffix>) => {
                            this.ficherobytes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.autonomiaService.query().subscribe(
            (res: HttpResponse<IAutonomiaMySuffix[]>) => {
                this.autonomias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.provinciaService.query().subscribe(
            (res: HttpResponse<IProvinciaMySuffix[]>) => {
                this.provincias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fichero.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheroService.update(this.fichero));
        } else {
            this.subscribeToSaveResponse(this.ficheroService.create(this.fichero));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFicheroMySuffix>>) {
        result.subscribe((res: HttpResponse<IFicheroMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFicheroByteById(index: number, item: IFicheroByteMySuffix) {
        return item.id;
    }

    trackAutonomiaById(index: number, item: IAutonomiaMySuffix) {
        return item.id;
    }

    trackProvinciaById(index: number, item: IProvinciaMySuffix) {
        return item.id;
    }
    get fichero() {
        return this._fichero;
    }

    set fichero(fichero: IFicheroMySuffix) {
        this._fichero = fichero;
    }
}
