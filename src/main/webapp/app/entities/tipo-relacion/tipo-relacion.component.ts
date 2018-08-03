import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoRelacion } from 'app/shared/model/tipo-relacion.model';
import { Principal } from 'app/core';
import { TipoRelacionService } from './tipo-relacion.service';

@Component({
    selector: 'jhi-tipo-relacion',
    templateUrl: './tipo-relacion.component.html'
})
export class TipoRelacionComponent implements OnInit, OnDestroy {
    tipoRelacions: ITipoRelacion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoRelacionService: TipoRelacionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoRelacionService.query().subscribe(
            (res: HttpResponse<ITipoRelacion[]>) => {
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

    trackId(index: number, item: ITipoRelacion) {
        return item.id;
    }

    registerChangeInTipoRelacions() {
        this.eventSubscriber = this.eventManager.subscribe('tipoRelacionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
