import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';

@Component({
    selector: 'jhi-conviviente-my-suffix-detail',
    templateUrl: './conviviente-my-suffix-detail.component.html'
})
export class ConvivienteMySuffixDetailComponent implements OnInit {
    conviviente: IConvivienteMySuffix;

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
