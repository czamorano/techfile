import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';

@Component({
    selector: 'jhi-regimen-procedencia-my-suffix-detail',
    templateUrl: './regimen-procedencia-my-suffix-detail.component.html'
})
export class RegimenProcedenciaMySuffixDetailComponent implements OnInit {
    regimenProcedencia: IRegimenProcedenciaMySuffix;

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
