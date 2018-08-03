import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';

@Component({
    selector: 'jhi-usuario-my-suffix-delete-dialog',
    templateUrl: './usuario-my-suffix-delete-dialog.component.html'
})
export class UsuarioMySuffixDeleteDialogComponent {
    usuario: IUsuarioMySuffix;

    constructor(
        private usuarioService: UsuarioMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'usuarioListModification',
                content: 'Deleted an usuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuario-my-suffix-delete-popup',
    template: ''
})
export class UsuarioMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsuarioMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.usuario = usuario;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
