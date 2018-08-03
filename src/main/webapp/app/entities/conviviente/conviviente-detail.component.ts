import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConviviente } from 'app/shared/model/conviviente.model';

@Component({
    selector: 'jhi-conviviente-detail',
    templateUrl: './conviviente-detail.component.html'
})
export class ConvivienteDetailComponent implements OnInit {
    conviviente: IConviviente;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ conviviente }) => {
            this.conviviente = conviviente;
        });
    }

    previousState() {
        window.history.back();
    }
}
