import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMesMySuffix } from 'app/shared/model/mes-my-suffix.model';
import { Principal } from 'app/core';
import { MesMySuffixService } from './mes-my-suffix.service';

@Component({
    selector: 'jhi-mes-my-suffix',
    templateUrl: './mes-my-suffix.component.html'
})
export class MesMySuffixComponent implements OnInit, OnDestroy {
    mes: IMesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mesService: MesMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.mesService.query().subscribe(
            (res: HttpResponse<IMesMySuffix[]>) => {
                this.mes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMesMySuffix) {
        return item.id;
    }

    registerChangeInMes() {
        this.eventSubscriber = this.eventManager.subscribe('mesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
