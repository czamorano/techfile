import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMesMySuffix } from 'app/shared/model/mes-my-suffix.model';
import { MesMySuffixService } from './mes-my-suffix.service';

@Component({
    selector: 'jhi-mes-my-suffix-delete-dialog',
    templateUrl: './mes-my-suffix-delete-dialog.component.html'
})
export class MesMySuffixDeleteDialogComponent {
    mes: IMesMySuffix;

    constructor(private mesService: MesMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mesListModification',
                content: 'Deleted an mes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mes-my-suffix-delete-popup',
    template: ''
})
export class MesMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mes }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MesMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.mes = mes;
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
