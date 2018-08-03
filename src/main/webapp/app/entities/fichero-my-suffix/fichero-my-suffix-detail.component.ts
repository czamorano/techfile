import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';

@Component({
    selector: 'jhi-fichero-my-suffix-detail',
    templateUrl: './fichero-my-suffix-detail.component.html'
})
export class FicheroMySuffixDetailComponent implements OnInit {
    fichero: IFicheroMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fichero }) => {
            this.fichero = fichero;
        });
    }

    previousState() {
        window.history.back();
    }
}
