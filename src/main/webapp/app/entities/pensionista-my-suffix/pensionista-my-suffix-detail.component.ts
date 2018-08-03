import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';

@Component({
    selector: 'jhi-pensionista-my-suffix-detail',
    templateUrl: './pensionista-my-suffix-detail.component.html'
})
export class PensionistaMySuffixDetailComponent implements OnInit {
    pensionista: IPensionistaMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionista }) => {
            this.pensionista = pensionista;
        });
    }

    previousState() {
        window.history.back();
    }
}
