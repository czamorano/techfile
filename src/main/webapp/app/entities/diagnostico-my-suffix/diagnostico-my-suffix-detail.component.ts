import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';

@Component({
    selector: 'jhi-diagnostico-my-suffix-detail',
    templateUrl: './diagnostico-my-suffix-detail.component.html'
})
export class DiagnosticoMySuffixDetailComponent implements OnInit {
    diagnostico: IDiagnosticoMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            this.diagnostico = diagnostico;
        });
    }

    previousState() {
        window.history.back();
    }
}
