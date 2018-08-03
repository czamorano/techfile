import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';

@Component({
    selector: 'jhi-fichero-byte-my-suffix-detail',
    templateUrl: './fichero-byte-my-suffix-detail.component.html'
})
export class FicheroByteMySuffixDetailComponent implements OnInit {
    ficheroByte: IFicheroByteMySuffix;

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
