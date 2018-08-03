import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';

@Component({
    selector: 'jhi-etiologia-my-suffix-detail',
    templateUrl: './etiologia-my-suffix-detail.component.html'
})
export class EtiologiaMySuffixDetailComponent implements OnInit {
    etiologia: IEtiologiaMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ etiologia }) => {
            this.etiologia = etiologia;
        });
    }

    previousState() {
        window.history.back();
    }
}
