import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';
import { Principal } from 'app/core';
import { DiscapacidadMySuffixService } from './discapacidad-my-suffix.service';

@Component({
    selector: 'jhi-discapacidad-my-suffix',
    templateUrl: './discapacidad-my-suffix.component.html'
})
export class DiscapacidadMySuffixComponent implements OnInit, OnDestroy {
    discapacidads: IDiscapacidadMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private discapacidadService: DiscapacidadMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.discapacidadService.query().subscribe(
            (res: HttpResponse<IDiscapacidadMySuffix[]>) => {
                this.discapacidads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDiscapacidads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDiscapacidadMySuffix) {
        return item.id;
    }

    registerChangeInDiscapacidads() {
        this.eventSubscriber = this.eventManager.subscribe('discapacidadListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
