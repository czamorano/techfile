import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';

@Component({
    selector: 'jhi-pension-concurrente-my-suffix-detail',
    templateUrl: './pension-concurrente-my-suffix-detail.component.html'
})
export class PensionConcurrenteMySuffixDetailComponent implements OnInit {
    pensionConcurrente: IPensionConcurrenteMySuffix;

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
