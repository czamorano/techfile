import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';
import { PerceptorMySuffixService } from './perceptor-my-suffix.service';
import { IPersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';
import { PersonaMySuffixService } from 'app/entities/persona-my-suffix';
import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from 'app/entities/pensionista-my-suffix';

@Component({
    selector: 'jhi-perceptor-my-suffix-update',
    templateUrl: './perceptor-my-suffix-update.component.html'
})
export class PerceptorMySuffixUpdateComponent implements OnInit {
    private _perceptor: IPerceptorMySuffix;
    isSaving: boolean;

    personas: IPersonaMySuffix[];

    pensionistas: IPensionistaMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perceptorService: PerceptorMySuffixService,
        private personaService: PersonaMySuffixService,
        private pensionistaService: PensionistaMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perceptor }) => {
            this.perceptor = perceptor;
        });
        this.personaService.query({ filter: 'perceptor-is-null' }).subscribe(
            (res: HttpResponse<IPersonaMySuffix[]>) => {
                if (!this.perceptor.persona || !this.perceptor.persona.id) {
                    this.personas = res.body;
                } else {
                    this.personaService.find(this.perceptor.persona.id).subscribe(
                        (subRes: HttpResponse<IPersonaMySuffix>) => {
                            this.personas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pensionistaService.query().subscribe(
            (res: HttpResponse<IPensionistaMySuffix[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerceptorMySuffix>>) {
        result.subscribe((res: HttpResponse<IPerceptorMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPensionistaById(index: number, item: IPensionistaMySuffix) {
        return item.id;
    }
    get perceptor() {
        return this._perceptor;
    }

    set perceptor(perceptor: IPerceptorMySuffix) {
        this._perceptor = perceptor;
    }
}
