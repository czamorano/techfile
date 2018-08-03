import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';
import { Principal } from 'app/core';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';

@Component({
    selector: 'jhi-usuario-my-suffix',
    templateUrl: './usuario-my-suffix.component.html'
})
export class UsuarioMySuffixComponent implements OnInit, OnDestroy {
    usuarios: IUsuarioMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private usuarioService: UsuarioMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.usuarioService.query().subscribe(
            (res: HttpResponse<IUsuarioMySuffix[]>) => {
                this.usuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUsuarioMySuffix) {
        return item.id;
    }

    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
