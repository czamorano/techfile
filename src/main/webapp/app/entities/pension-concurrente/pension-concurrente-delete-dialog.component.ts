import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPensionConcurrente } from 'app/shared/model/pension-concurrente.model';
import { PensionConcurrenteService } from './pension-concurrente.service';

@Component({
    selector: 'jhi-pension-concurrente-delete-dialog',
    templateUrl: './pension-concurrente-delete-dialog.component.html'
})
export class PensionConcurrenteDeleteDialogComponent {
    pensionConcurrente: IPensionConcurrente;

    constructor(
        private pensionConcurrenteService: PensionConcurrenteService,
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
    selector: 'jhi-pension-concurrente-delete-popup',
    template: ''
})
export class PensionConcurrenteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionConcurrente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PensionConcurrenteDeleteDialogComponent as Component, {
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
