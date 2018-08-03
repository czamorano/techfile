import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerceptor } from 'app/shared/model/perceptor.model';

@Component({
    selector: 'jhi-perceptor-detail',
    templateUrl: './perceptor-detail.component.html'
})
export class PerceptorDetailComponent implements OnInit {
    perceptor: IPerceptor;

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
