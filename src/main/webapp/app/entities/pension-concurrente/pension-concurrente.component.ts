import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPensionConcurrente } from 'app/shared/model/pension-concurrente.model';
import { Principal } from 'app/core';
import { PensionConcurrenteService } from './pension-concurrente.service';

@Component({
    selector: 'jhi-pension-concurrente',
    templateUrl: './pension-concurrente.component.html'
})
export class PensionConcurrenteComponent implements OnInit, OnDestroy {
    pensionConcurrentes: IPensionConcurrente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pensionConcurrenteService: PensionConcurrenteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.pensionConcurrenteService.query().subscribe(
            (res: HttpResponse<IPensionConcurrente[]>) => {
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

    trackId(index: number, item: IPensionConcurrente) {
        return item.id;
    }

    registerChangeInPensionConcurrentes() {
        this.eventSubscriber = this.eventManager.subscribe('pensionConcurrenteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
