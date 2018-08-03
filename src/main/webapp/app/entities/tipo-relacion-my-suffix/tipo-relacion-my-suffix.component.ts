import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';
import { Principal } from 'app/core';
import { TipoRelacionMySuffixService } from './tipo-relacion-my-suffix.service';

@Component({
    selector: 'jhi-tipo-relacion-my-suffix',
    templateUrl: './tipo-relacion-my-suffix.component.html'
})
export class TipoRelacionMySuffixComponent implements OnInit, OnDestroy {
    tipoRelacions: ITipoRelacionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoRelacionService: TipoRelacionMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoRelacionService.query().subscribe(
            (res: HttpResponse<ITipoRelacionMySuffix[]>) => {
                this.tipoRelacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoRelacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoRelacionMySuffix) {
        return item.id;
    }

    registerChangeInTipoRelacions() {
        this.eventSubscriber = this.eventManager.subscribe('tipoRelacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
