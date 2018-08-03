import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiscapacidad } from 'app/shared/model/discapacidad.model';

@Component({
    selector: 'jhi-discapacidad-detail',
    templateUrl: './discapacidad-detail.component.html'
})
export class DiscapacidadDetailComponent implements OnInit {
    discapacidad: IDiscapacidad;

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
