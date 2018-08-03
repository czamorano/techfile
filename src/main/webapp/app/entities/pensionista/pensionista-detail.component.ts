import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPensionista } from 'app/shared/model/pensionista.model';

@Component({
    selector: 'jhi-pensionista-detail',
    templateUrl: './pensionista-detail.component.html'
})
export class PensionistaDetailComponent implements OnInit {
    pensionista: IPensionista;

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
