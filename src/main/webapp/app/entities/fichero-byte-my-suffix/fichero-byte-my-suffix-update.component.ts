import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IFicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';
import { FicheroByteMySuffixService } from './fichero-byte-my-suffix.service';

@Component({
    selector: 'jhi-fichero-byte-my-suffix-update',
    templateUrl: './fichero-byte-my-suffix-update.component.html'
})
export class FicheroByteMySuffixUpdateComponent implements OnInit {
    private _ficheroByte: IFicheroByteMySuffix;
    isSaving: boolean;

    constructor(
        private dataUtils: JhiDataUtils,
        private ficheroByteService: FicheroByteMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ficheroByte.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheroByteService.update(this.ficheroByte));
        } else {
            this.subscribeToSaveResponse(this.ficheroByteService.create(this.ficheroByte));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFicheroByteMySuffix>>) {
        result.subscribe((res: HttpResponse<IFicheroByteMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get ficheroByte() {
        return this._ficheroByte;
    }

    set ficheroByte(ficheroByte: IFicheroByteMySuffix) {
        this._ficheroByte = ficheroByte;
    }
}
