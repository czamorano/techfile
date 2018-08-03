import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';

@Component({
    selector: 'jhi-usuario-my-suffix-update',
    templateUrl: './usuario-my-suffix-update.component.html'
})
export class UsuarioMySuffixUpdateComponent implements OnInit {
    private _usuario: IUsuarioMySuffix;
    isSaving: boolean;

    constructor(private usuarioService: UsuarioMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioMySuffix>>) {
        result.subscribe((res: HttpResponse<IUsuarioMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get usuario() {
        return this._usuario;
    }

    set usuario(usuario: IUsuarioMySuffix) {
        this._usuario = usuario;
    }
}
