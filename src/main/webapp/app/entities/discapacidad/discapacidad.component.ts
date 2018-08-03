import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiscapacidad } from 'app/shared/model/discapacidad.model';
import { Principal } from 'app/core';
import { DiscapacidadService } from './discapacidad.service';

@Component({
    selector: 'jhi-discapacidad',
    templateUrl: './discapacidad.component.html'
})
export class DiscapacidadComponent implements OnInit, OnDestroy {
    discapacidads: IDiscapacidad[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private discapacidadService: DiscapacidadService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.discapacidadService.query().subscribe(
            (res: HttpResponse<IDiscapacidad[]>) => {
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

    trackId(index: number, item: IDiscapacidad) {
        return item.id;
    }

    registerChangeInDiscapacidads() {
        this.eventSubscriber = this.eventManager.subscribe('discapacidadListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
