import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtiologia } from 'app/shared/model/etiologia.model';
import { EtiologiaService } from './etiologia.service';

@Component({
    selector: 'jhi-etiologia-delete-dialog',
    templateUrl: './etiologia-delete-dialog.component.html'
})
export class EtiologiaDeleteDialogComponent {
    etiologia: IEtiologia;

    constructor(private etiologiaService: EtiologiaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

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
    selector: 'jhi-etiologia-delete-popup',
    template: ''
})
export class EtiologiaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ etiologia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EtiologiaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
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
