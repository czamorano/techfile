import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';

@Component({
    selector: 'jhi-usuario-my-suffix-detail',
    templateUrl: './usuario-my-suffix-detail.component.html'
})
export class UsuarioMySuffixDetailComponent implements OnInit {
    usuario: IUsuarioMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
    }

    previousState() {
        window.history.back();
    }
}
