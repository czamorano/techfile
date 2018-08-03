import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';
import { PersonaMySuffixService } from './persona-my-suffix.service';

@Component({
    selector: 'jhi-persona-my-suffix-update',
    templateUrl: './persona-my-suffix-update.component.html'
})
export class PersonaMySuffixUpdateComponent implements OnInit {
    private _persona: IPersonaMySuffix;
    isSaving: boolean;
    fechaNacimientoDp: any;

    constructor(private personaService: PersonaMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ persona }) => {
            this.persona = persona;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(this.personaService.create(this.persona));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPersonaMySuffix>>) {
        result.subscribe((res: HttpResponse<IPersonaMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get persona() {
        return this._persona;
    }

    set persona(persona: IPersonaMySuffix) {
        this._persona = persona;
    }
}
