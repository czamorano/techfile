import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';

@Component({
    selector: 'jhi-regimen-procedencia-detail',
    templateUrl: './regimen-procedencia-detail.component.html'
})
export class RegimenProcedenciaDetailComponent implements OnInit {
    regimenProcedencia: IRegimenProcedencia;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ regimenProcedencia }) => {
            this.regimenProcedencia = regimenProcedencia;
        });
    }

    previousState() {
        window.history.back();
    }
}
