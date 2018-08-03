import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';
import { Principal } from 'app/core';
import { RegimenProcedenciaMySuffixService } from './regimen-procedencia-my-suffix.service';

@Component({
    selector: 'jhi-regimen-procedencia-my-suffix',
    templateUrl: './regimen-procedencia-my-suffix.component.html'
})
export class RegimenProcedenciaMySuffixComponent implements OnInit, OnDestroy {
    regimenProcedencias: IRegimenProcedenciaMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private regimenProcedenciaService: RegimenProcedenciaMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.regimenProcedenciaService.query().subscribe(
            (res: HttpResponse<IRegimenProcedenciaMySuffix[]>) => {
                this.regimenProcedencias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRegimenProcedencias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRegimenProcedenciaMySuffix) {
        return item.id;
    }

    registerChangeInRegimenProcedencias() {
        this.eventSubscriber = this.eventManager.subscribe('regimenProcedenciaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
