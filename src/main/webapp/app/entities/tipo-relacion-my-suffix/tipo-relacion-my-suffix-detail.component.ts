import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';

@Component({
    selector: 'jhi-tipo-relacion-my-suffix-detail',
    templateUrl: './tipo-relacion-my-suffix-detail.component.html'
})
export class TipoRelacionMySuffixDetailComponent implements OnInit {
    tipoRelacion: ITipoRelacionMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoRelacion }) => {
            this.tipoRelacion = tipoRelacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
