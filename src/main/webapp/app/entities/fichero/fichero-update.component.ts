import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFichero } from 'app/shared/model/fichero.model';
import { FicheroService } from './fichero.service';
import { IFicheroByte } from 'app/shared/model/fichero-byte.model';
import { FicheroByteService } from 'app/entities/fichero-byte';
import { IAutonomia } from 'app/shared/model/autonomia.model';
import { AutonomiaService } from 'app/entities/autonomia';
import { IProvincia } from 'app/shared/model/provincia.model';
import { ProvinciaService } from 'app/entities/provincia';

@Component({
    selector: 'jhi-fichero-update',
    templateUrl: './fichero-update.component.html'
})
export class FicheroUpdateComponent implements OnInit {
    private _fichero: IFichero;
    isSaving: boolean;

    ficherobytes: IFicheroByte[];

    autonomias: IAutonomia[];

    provincias: IProvincia[];
    fechaCreacionOrigenDp: any;
    fechaAltaAplicacionDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ficheroService: FicheroService,
        private ficheroByteService: FicheroByteService,
        private autonomiaService: AutonomiaService,
        private provinciaService: ProvinciaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fichero }) => {
            this.fichero = fichero;
        });
        this.ficheroByteService.query({ filter: 'fichero-is-null' }).subscribe(
            (res: HttpResponse<IFicheroByte[]>) => {
                if (!this.fichero.ficheroByte || !this.fichero.ficheroByte.id) {
                    this.ficherobytes = res.body;
                } else {
                    this.ficheroByteService.find(this.fichero.ficheroByte.id).subscribe(
                        (subRes: HttpResponse<IFicheroByte>) => {
                            this.ficherobytes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.autonomiaService.query().subscribe(
            (res: HttpResponse<IAutonomia[]>) => {
                this.autonomias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.provinciaService.query().subscribe(
            (res: HttpResponse<IProvincia[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFichero>>) {
        result.subscribe((res: HttpResponse<IFichero>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFicheroByteById(index: number, item: IFicheroByte) {
        return item.id;
    }

    trackAutonomiaById(index: number, item: IAutonomia) {
        return item.id;
    }

    trackProvinciaById(index: number, item: IProvincia) {
        return item.id;
    }
    get fichero() {
        return this._fichero;
    }

    set fichero(fichero: IFichero) {
        this._fichero = fichero;
    }
}
