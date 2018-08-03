import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';
import { Principal } from 'app/core';
import { FicheroByteMySuffixService } from './fichero-byte-my-suffix.service';

@Component({
    selector: 'jhi-fichero-byte-my-suffix',
    templateUrl: './fichero-byte-my-suffix.component.html'
})
export class FicheroByteMySuffixComponent implements OnInit, OnDestroy {
    ficheroBytes: IFicheroByteMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ficheroByteService: FicheroByteMySuffixService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ficheroByteService.query().subscribe(
            (res: HttpResponse<IFicheroByteMySuffix[]>) => {
                this.ficheroBytes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheroBytes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFicheroByteMySuffix) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInFicheroBytes() {
        this.eventSubscriber = this.eventManager.subscribe('ficheroByteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
