import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPensionConcurrente } from 'app/shared/model/pension-concurrente.model';

@Component({
    selector: 'jhi-pension-concurrente-detail',
    templateUrl: './pension-concurrente-detail.component.html'
})
export class PensionConcurrenteDetailComponent implements OnInit {
    pensionConcurrente: IPensionConcurrente;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionConcurrente }) => {
            this.pensionConcurrente = pensionConcurrente;
        });
    }

    previousState() {
        window.history.back();
    }
}
