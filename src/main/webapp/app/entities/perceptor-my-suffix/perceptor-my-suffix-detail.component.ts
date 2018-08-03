import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';

@Component({
    selector: 'jhi-perceptor-my-suffix-detail',
    templateUrl: './perceptor-my-suffix-detail.component.html'
})
export class PerceptorMySuffixDetailComponent implements OnInit {
    perceptor: IPerceptorMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perceptor }) => {
            this.perceptor = perceptor;
        });
    }

    previousState() {
        window.history.back();
    }
}
