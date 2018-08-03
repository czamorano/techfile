import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';
import { Principal } from 'app/core';
import { DiagnosticoMySuffixService } from './diagnostico-my-suffix.service';

@Component({
    selector: 'jhi-diagnostico-my-suffix',
    templateUrl: './diagnostico-my-suffix.component.html'
})
export class DiagnosticoMySuffixComponent implements OnInit, OnDestroy {
    diagnosticos: IDiagnosticoMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private diagnosticoService: DiagnosticoMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.diagnosticoService.query().subscribe(
            (res: HttpResponse<IDiagnosticoMySuffix[]>) => {
                this.diagnosticos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDiagnosticos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDiagnosticoMySuffix) {
        return item.id;
    }

    registerChangeInDiagnosticos() {
        this.eventSubscriber = this.eventManager.subscribe('diagnosticoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
