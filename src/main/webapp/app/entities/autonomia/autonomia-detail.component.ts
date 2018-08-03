import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAutonomia } from 'app/shared/model/autonomia.model';

@Component({
    selector: 'jhi-autonomia-detail',
    templateUrl: './autonomia-detail.component.html'
})
export class AutonomiaDetailComponent implements OnInit {
    autonomia: IAutonomia;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ autonomia }) => {
            this.autonomia = autonomia;
        });
    }

    previousState() {
        window.history.back();
    }
}
