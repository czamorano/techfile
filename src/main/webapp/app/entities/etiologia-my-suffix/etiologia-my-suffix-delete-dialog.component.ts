import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';
import { EtiologiaMySuffixService } from './etiologia-my-suffix.service';

@Component({
    selector: 'jhi-etiologia-my-suffix-delete-dialog',
    templateUrl: './etiologia-my-suffix-delete-dialog.component.html'
})
export class EtiologiaMySuffixDeleteDialogComponent {
    etiologia: IEtiologiaMySuffix;

    constructor(
        private etiologiaService: EtiologiaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.etiologiaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'etiologiaListModification',
                content: 'Deleted an etiologia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-etiologia-my-suffix-delete-popup',
    template: ''
})
export class EtiologiaMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ etiologia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EtiologiaMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.etiologia = etiologia;
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
