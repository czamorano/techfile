import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFicheroByte } from 'app/shared/model/fichero-byte.model';
import { Principal } from 'app/core';
import { FicheroByteService } from './fichero-byte.service';

@Component({
    selector: 'jhi-fichero-byte',
    templateUrl: './fichero-byte.component.html'
})
export class FicheroByteComponent implements OnInit, OnDestroy {
    ficheroBytes: IFicheroByte[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ficheroByteService: FicheroByteService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ficheroByteService.query().subscribe(
            (res: HttpResponse<IFicheroByte[]>) => {
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

    trackId(index: number, item: IFicheroByte) {
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
