import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEtiologia } from 'app/shared/model/etiologia.model';
import { Principal } from 'app/core';
import { EtiologiaService } from './etiologia.service';

@Component({
    selector: 'jhi-etiologia',
    templateUrl: './etiologia.component.html'
})
export class EtiologiaComponent implements OnInit, OnDestroy {
    etiologias: IEtiologia[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private etiologiaService: EtiologiaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.etiologiaService.query().subscribe(
            (res: HttpResponse<IEtiologia[]>) => {
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

    trackId(index: number, item: IEtiologia) {
        return item.id;
    }

    registerChangeInEtiologias() {
        this.eventSubscriber = this.eventManager.subscribe('etiologiaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
