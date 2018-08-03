import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';
import { Principal } from 'app/core';
import { RegimenProcedenciaService } from './regimen-procedencia.service';

@Component({
    selector: 'jhi-regimen-procedencia',
    templateUrl: './regimen-procedencia.component.html'
})
export class RegimenProcedenciaComponent implements OnInit, OnDestroy {
    regimenProcedencias: IRegimenProcedencia[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private regimenProcedenciaService: RegimenProcedenciaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.regimenProcedenciaService.query().subscribe(
            (res: HttpResponse<IRegimenProcedencia[]>) => {
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

    trackId(index: number, item: IRegimenProcedencia) {
        return item.id;
    }

    registerChangeInRegimenProcedencias() {
        this.eventSubscriber = this.eventManager.subscribe('regimenProcedenciaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
