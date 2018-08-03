import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';

@Component({
    selector: 'jhi-discapacidad-my-suffix-detail',
    templateUrl: './discapacidad-my-suffix-detail.component.html'
})
export class DiscapacidadMySuffixDetailComponent implements OnInit {
    discapacidad: IDiscapacidadMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ discapacidad }) => {
            this.discapacidad = discapacidad;
        });
    }

    previousState() {
        window.history.back();
    }
}
