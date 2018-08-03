import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFichero } from 'app/shared/model/fichero.model';
import { Principal } from 'app/core';
import { FicheroService } from './fichero.service';

@Component({
    selector: 'jhi-fichero',
    templateUrl: './fichero.component.html'
})
export class FicheroComponent implements OnInit, OnDestroy {
    ficheroes: IFichero[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ficheroService: FicheroService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ficheroService.query().subscribe(
            (res: HttpResponse<IFichero[]>) => {
                this.ficheroes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFicheroes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFichero) {
        return item.id;
    }

    registerChangeInFicheroes() {
        this.eventSubscriber = this.eventManager.subscribe('ficheroListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
