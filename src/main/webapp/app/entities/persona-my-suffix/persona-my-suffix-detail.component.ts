import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';

@Component({
    selector: 'jhi-persona-my-suffix-detail',
    templateUrl: './persona-my-suffix-detail.component.html'
})
export class PersonaMySuffixDetailComponent implements OnInit {
    persona: IPersonaMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ persona }) => {
            this.persona = persona;
        });
    }

    previousState() {
        window.history.back();
    }
}
