import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerceptor } from 'app/shared/model/perceptor.model';
import { PerceptorService } from './perceptor.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona';
import { IPensionista } from 'app/shared/model/pensionista.model';
import { PensionistaService } from 'app/entities/pensionista';

@Component({
    selector: 'jhi-perceptor-update',
    templateUrl: './perceptor-update.component.html'
})
export class PerceptorUpdateComponent implements OnInit {
    private _perceptor: IPerceptor;
    isSaving: boolean;

    personas: IPersona[];

    pensionistas: IPensionista[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perceptorService: PerceptorService,
        private personaService: PersonaService,
        private pensionistaService: PensionistaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perceptor }) => {
            this.perceptor = perceptor;
        });
        this.personaService.query({ filter: 'perceptor-is-null' }).subscribe(
            (res: HttpResponse<IPersona[]>) => {
                if (!this.perceptor.persona || !this.perceptor.persona.id) {
                    this.personas = res.body;
                } else {
                    this.personaService.find(this.perceptor.persona.id).subscribe(
                        (subRes: HttpResponse<IPersona>) => {
                            this.personas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pensionistaService.query().subscribe(
            (res: HttpResponse<IPensionista[]>) => {
                this.pensionistas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perceptor.id !== undefined) {
            this.subscribeToSaveResponse(this.perceptorService.update(this.perceptor));
        } else {
            this.subscribeToSaveResponse(this.perceptorService.create(this.perceptor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerceptor>>) {
        result.subscribe((res: HttpResponse<IPerceptor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPensionistaById(index: number, item: IPensionista) {
        return item.id;
    }
    get perceptor() {
        return this._perceptor;
    }

    set perceptor(perceptor: IPerceptor) {
        this._perceptor = perceptor;
    }
}
