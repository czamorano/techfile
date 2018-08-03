import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';
import { Principal } from 'app/core';
import { EtiologiaMySuffixService } from './etiologia-my-suffix.service';

@Component({
    selector: 'jhi-etiologia-my-suffix',
    templateUrl: './etiologia-my-suffix.component.html'
})
export class EtiologiaMySuffixComponent implements OnInit, OnDestroy {
    etiologias: IEtiologiaMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private etiologiaService: EtiologiaMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.etiologiaService.query().subscribe(
            (res: HttpResponse<IEtiologiaMySuffix[]>) => {
                this.etiologias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEtiologias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEtiologiaMySuffix) {
        return item.id;
    }

    registerChangeInEtiologias() {
        this.eventSubscriber = this.eventManager.subscribe('etiologiaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
