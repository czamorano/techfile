import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMes } from 'app/shared/model/mes.model';
import { Principal } from 'app/core';
import { MesService } from './mes.service';

@Component({
    selector: 'jhi-mes',
    templateUrl: './mes.component.html'
})
export class MesComponent implements OnInit, OnDestroy {
    mes: IMes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mesService: MesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.mesService.query().subscribe(
            (res: HttpResponse<IMes[]>) => {
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

    trackId(index: number, item: IMes) {
        return item.id;
    }

    registerChangeInMes() {
        this.eventSubscriber = this.eventManager.subscribe('mesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
