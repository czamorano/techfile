import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtiologia } from 'app/shared/model/etiologia.model';

@Component({
    selector: 'jhi-etiologia-detail',
    templateUrl: './etiologia-detail.component.html'
})
export class EtiologiaDetailComponent implements OnInit {
    etiologia: IEtiologia;

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
