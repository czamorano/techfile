import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';
import { Principal } from 'app/core';
import { PensionConcurrenteMySuffixService } from './pension-concurrente-my-suffix.service';

@Component({
    selector: 'jhi-pension-concurrente-my-suffix',
    templateUrl: './pension-concurrente-my-suffix.component.html'
})
export class PensionConcurrenteMySuffixComponent implements OnInit, OnDestroy {
    pensionConcurrentes: IPensionConcurrenteMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pensionConcurrenteService: PensionConcurrenteMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.pensionConcurrenteService.query().subscribe(
            (res: HttpResponse<IPensionConcurrenteMySuffix[]>) => {
                this.pensionConcurrentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPensionConcurrentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPensionConcurrenteMySuffix) {
        return item.id;
    }

    registerChangeInPensionConcurrentes() {
        this.eventSubscriber = this.eventManager.subscribe('pensionConcurrenteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
