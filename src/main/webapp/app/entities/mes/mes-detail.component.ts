import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMes } from 'app/shared/model/mes.model';

@Component({
    selector: 'jhi-mes-detail',
    templateUrl: './mes-detail.component.html'
})
export class MesDetailComponent implements OnInit {
    mes: IMes;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mes }) => {
            this.mes = mes;
        });
    }

    previousState() {
        window.history.back();
    }
}
