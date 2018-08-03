import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMesMySuffix } from 'app/shared/model/mes-my-suffix.model';

@Component({
    selector: 'jhi-mes-my-suffix-detail',
    templateUrl: './mes-my-suffix-detail.component.html'
})
export class MesMySuffixDetailComponent implements OnInit {
    mes: IMesMySuffix;

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
