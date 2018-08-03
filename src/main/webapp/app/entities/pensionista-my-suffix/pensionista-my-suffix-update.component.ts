import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from './pensionista-my-suffix.service';
import { IPersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';
import { PersonaMySuffixService } from 'app/entities/persona-my-suffix';
import { IPerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';
import { PerceptorMySuffixService } from 'app/entities/perceptor-my-suffix';
import { IRegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';
import { RegimenProcedenciaMySuffixService } from 'app/entities/regimen-procedencia-my-suffix';
import { IPensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';
import { PensionConcurrenteMySuffixService } from 'app/entities/pension-concurrente-my-suffix';
import { ITipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';
import { TipoRelacionMySuffixService } from 'app/entities/tipo-relacion-my-suffix';
import { IDiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';
import { DiscapacidadMySuffixService } from 'app/entities/discapacidad-my-suffix';
import { IDiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';
import { DiagnosticoMySuffixService } from 'app/entities/diagnostico-my-suffix';
import { IEtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';
import { EtiologiaMySuffixService } from 'app/entities/etiologia-my-suffix';
import { IFicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';
import { FicheroMySuffixService } from 'app/entities/fichero-my-suffix';

@Component({
    selector: 'jhi-pensionista-my-suffix-update',
    templateUrl: './pensionista-my-suffix-update.component.html'
})
export class PensionistaMySuffixUpdateComponent implements OnInit {
    private _pensionista: IPensionistaMySuffix;
    isSaving: boolean;

    personas: IPersonaMySuffix[];

    perceptors: IPerceptorMySuffix[];

    regimenprocedencias: IRegimenProcedenciaMySuffix[];

    pensionconcurrentes: IPensionConcurrenteMySuffix[];

    tiporelacions: ITipoRelacionMySuffix[];

    discapacidads: IDiscapacidadMySuffix[];

    diagnosticos: IDiagnosticoMySuffix[];

    etiologias: IEtiologiaMySuffix[];

    ficheroes: IFicheroMySuffix[];
    fechaSolicitudPensionDp: any;
    fechaResolucionPensionDp: any;
    fechaAltaNominaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pensionistaService: PensionistaMySuffixService,
        private personaService: PersonaMySuffixService,
        private perceptorService: PerceptorMySuffixService,
        private regimenProcedenciaService: RegimenProcedenciaMySuffixService,
        private pensionConcurrenteService: PensionConcurrenteMySuffixService,
        private tipoRelacionService: TipoRelacionMySuffixService,
        private discapacidadService: DiscapacidadMySuffixService,
        private diagnosticoService: DiagnosticoMySuffixService,
        private etiologiaService: EtiologiaMySuffixService,
        private ficheroService: FicheroMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pensionista }) => {
            this.pensionista = pensionista;
        });
        this.personaService.query({ filter: 'pensionista-is-null' }).subscribe(
            (res: HttpResponse<IPersonaMySuffix[]>) => {
                if (!this.pensionista.persona || !this.pensionista.persona.id) {
                    this.personas = res.body;
                } else {
                    this.personaService.find(this.pensionista.persona.id).subscribe(
                        (subRes: HttpResponse<IPersonaMySuffix>) => {
                            this.personas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.perceptorService.query({ filter: 'pensionista-is-null' }).subscribe(
            (res: HttpResponse<IPerceptorMySuffix[]>) => {
                if (!this.pensionista.perceptor || !this.pensionista.perceptor.id) {
                    this.perceptors = res.body;
                } else {
                    this.perceptorService.find(this.pensionista.perceptor.id).subscribe(
                        (subRes: HttpResponse<IPerceptorMySuffix>) => {
                            this.perceptors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.regimenProcedenciaService.query().subscribe(
            (res: HttpResponse<IRegimenProcedenciaMySuffix[]>) => {
                this.regimenprocedencias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pensionConcurrenteService.query().subscribe(
            (res: HttpResponse<IPensionConcurrenteMySuffix[]>) => {
                this.pensionconcurrentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoRelacionService.query().subscribe(
            (res: HttpResponse<ITipoRelacionMySuffix[]>) => {
                this.tiporelacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.discapacidadService.query().subscribe(
            (res: HttpResponse<IDiscapacidadMySuffix[]>) => {
                this.discapacidads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.diagnosticoService.query().subscribe(
            (res: HttpResponse<IDiagnosticoMySuffix[]>) => {
                this.diagnosticos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.etiologiaService.query().subscribe(
            (res: HttpResponse<IEtiologiaMySuffix[]>) => {
                this.etiologias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ficheroService.query().subscribe(
            (res: HttpResponse<IFicheroMySuffix[]>) => {
                this.ficheroes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pensionista.id !== undefined) {
            this.subscribeToSaveResponse(this.pensionistaService.update(this.pensionista));
        } else {
            this.subscribeToSaveResponse(this.pensionistaService.create(this.pensionista));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPensionistaMySuffix>>) {
        result.subscribe((res: HttpResponse<IPensionistaMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonaById(index: number, item: IPersonaMySuffix) {
        return item.id;
    }

    trackPerceptorById(index: number, item: IPerceptorMySuffix) {
        return item.id;
    }

    trackRegimenProcedenciaById(index: number, item: IRegimenProcedenciaMySuffix) {
        return item.id;
    }

    trackPensionConcurrenteById(index: number, item: IPensionConcurrenteMySuffix) {
        return item.id;
    }

    trackTipoRelacionById(index: number, item: ITipoRelacionMySuffix) {
        return item.id;
    }

    trackDiscapacidadById(index: number, item: IDiscapacidadMySuffix) {
        return item.id;
    }

    trackDiagnosticoById(index: number, item: IDiagnosticoMySuffix) {
        return item.id;
    }

    trackEtiologiaById(index: number, item: IEtiologiaMySuffix) {
        return item.id;
    }

    trackFicheroById(index: number, item: IFicheroMySuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get pensionista() {
        return this._pensionista;
    }

    set pensionista(pensionista: IPensionistaMySuffix) {
        this._pensionista = pensionista;
    }
}
