import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPensionista } from 'app/shared/model/pensionista.model';
import { PensionistaService } from './pensionista.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';
import { IPerceptor } from 'app/shared/model/perceptor.model';
import { PerceptorService } from 'app/entities/perceptor';
import { IRegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';
import { RegimenProcedenciaService } from 'app/entities/regimen-procedencia';
import { IPensionConcurrente } from 'app/shared/model/pension-concurrente.model';
import { PensionConcurrenteService } from 'app/entities/pension-concurrente';
import { ITipoRelacion } from 'app/shared/model/tipo-relacion.model';
import { TipoRelacionService } from 'app/entities/tipo-relacion';
import { IDiscapacidad } from 'app/shared/model/discapacidad.model';
import { DiscapacidadService } from 'app/entities/discapacidad';
import { IDiagnostico } from 'app/shared/model/diagnostico.model';
import { DiagnosticoService } from 'app/entities/diagnostico';
import { IEtiologia } from 'app/shared/model/etiologia.model';
import { EtiologiaService } from 'app/entities/etiologia';
import { IFichero } from 'app/shared/model/fichero.model';
import { FicheroService } from 'app/entities/fichero';

@Component({
    selector: 'jhi-pensionista-update',
    templateUrl: './pensionista-update.component.html'
})
export class PensionistaUpdateComponent implements OnInit {
    private _pensionista: IPensionista;
    isSaving: boolean;

    personas: IPersona[];

    perceptors: IPerceptor[];

    regimenprocedencias: IRegimenProcedencia[];

    pensionconcurrentes: IPensionConcurrente[];

    tiporelacions: ITipoRelacion[];

    discapacidads: IDiscapacidad[];

    diagnosticos: IDiagnostico[];

    etiologias: IEtiologia[];

    ficheroes: IFichero[];
    fechaSolicitudPensionDp: any;
    fechaResolucionPensionDp: any;
    fechaAltaNominaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pensionistaService: PensionistaService,
        private personaService: PersonaService,
        private perceptorService: PerceptorService,
        private regimenProcedenciaService: RegimenProcedenciaService,
        private pensionConcurrenteService: PensionConcurrenteService,
        private tipoRelacionService: TipoRelacionService,
        private discapacidadService: DiscapacidadService,
        private diagnosticoService: DiagnosticoService,
        private etiologiaService: EtiologiaService,
        private ficheroService: FicheroService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pensionista }) => {
            this.pensionista = pensionista;
        });
        this.personaService.query({ filter: 'pensionista-is-null' }).subscribe(
            (res: HttpResponse<IPersona[]>) => {
                if (!this.pensionista.persona || !this.pensionista.persona.id) {
                    this.personas = res.body;
                } else {
                    this.personaService.find(this.pensionista.persona.id).subscribe(
                        (subRes: HttpResponse<IPersona>) => {
                            this.personas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.perceptorService.query({ filter: 'pensionista-is-null' }).subscribe(
            (res: HttpResponse<IPerceptor[]>) => {
                if (!this.pensionista.perceptor || !this.pensionista.perceptor.id) {
                    this.perceptors = res.body;
                } else {
                    this.perceptorService.find(this.pensionista.perceptor.id).subscribe(
                        (subRes: HttpResponse<IPerceptor>) => {
                            this.perceptors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.regimenProcedenciaService.query().subscribe(
            (res: HttpResponse<IRegimenProcedencia[]>) => {
                this.regimenprocedencias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pensionConcurrenteService.query().subscribe(
            (res: HttpResponse<IPensionConcurrente[]>) => {
                this.pensionconcurrentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoRelacionService.query().subscribe(
            (res: HttpResponse<ITipoRelacion[]>) => {
                this.tiporelacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.discapacidadService.query().subscribe(
            (res: HttpResponse<IDiscapacidad[]>) => {
                this.discapacidads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.diagnosticoService.query().subscribe(
            (res: HttpResponse<IDiagnostico[]>) => {
                this.diagnosticos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.etiologiaService.query().subscribe(
            (res: HttpResponse<IEtiologia[]>) => {
                this.etiologias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ficheroService.query().subscribe(
            (res: HttpResponse<IFichero[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPensionista>>) {
        result.subscribe((res: HttpResponse<IPensionista>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonaById(index: number, item: IPersona) {
        return item.id;
    }

    trackPerceptorById(index: number, item: IPerceptor) {
        return item.id;
    }

    trackRegimenProcedenciaById(index: number, item: IRegimenProcedencia) {
        return item.id;
    }

    trackPensionConcurrenteById(index: number, item: IPensionConcurrente) {
        return item.id;
    }

    trackTipoRelacionById(index: number, item: ITipoRelacion) {
        return item.id;
    }

    trackDiscapacidadById(index: number, item: IDiscapacidad) {
        return item.id;
    }

    trackDiagnosticoById(index: number, item: IDiagnostico) {
        return item.id;
    }

    trackEtiologiaById(index: number, item: IEtiologia) {
        return item.id;
    }

    trackFicheroById(index: number, item: IFichero) {
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

    set pensionista(pensionista: IPensionista) {
        this._pensionista = pensionista;
    }
}
