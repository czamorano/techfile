import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';

@Component({
    selector: 'jhi-provincia-my-suffix-detail',
    templateUrl: './provincia-my-suffix-detail.component.html'
})
export class ProvinciaMySuffixDetailComponent implements OnInit {
    provincia: IProvinciaMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ provincia }) => {
            this.provincia = provincia;
        });
    }

    previousState() {
        window.history.back();
    }
}
