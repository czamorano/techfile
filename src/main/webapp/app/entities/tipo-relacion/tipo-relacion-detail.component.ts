import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoRelacion } from 'app/shared/model/tipo-relacion.model';

@Component({
    selector: 'jhi-tipo-relacion-detail',
    templateUrl: './tipo-relacion-detail.component.html'
})
export class TipoRelacionDetailComponent implements OnInit {
    tipoRelacion: ITipoRelacion;

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
