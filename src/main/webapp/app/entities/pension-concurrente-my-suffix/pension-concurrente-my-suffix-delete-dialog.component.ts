import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';
import { PensionConcurrenteMySuffixService } from './pension-concurrente-my-suffix.service';

@Component({
    selector: 'jhi-pension-concurrente-my-suffix-delete-dialog',
    templateUrl: './pension-concurrente-my-suffix-delete-dialog.component.html'
})
export class PensionConcurrenteMySuffixDeleteDialogComponent {
    pensionConcurrente: IPensionConcurrenteMySuffix;

    constructor(
        private pensionConcurrenteService: PensionConcurrenteMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pensionConcurrenteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pensionConcurrenteListModification',
                content: 'Deleted an pensionConcurrente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pension-concurrente-my-suffix-delete-popup',
    template: ''
})
export class PensionConcurrenteMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionConcurrente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PensionConcurrenteMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pensionConcurrente = pensionConcurrente;
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
