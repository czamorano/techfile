import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFicheroByte } from 'app/shared/model/fichero-byte.model';

@Component({
    selector: 'jhi-fichero-byte-detail',
    templateUrl: './fichero-byte-detail.component.html'
})
export class FicheroByteDetailComponent implements OnInit {
    ficheroByte: IFicheroByte;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheroByte }) => {
            this.ficheroByte = ficheroByte;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
