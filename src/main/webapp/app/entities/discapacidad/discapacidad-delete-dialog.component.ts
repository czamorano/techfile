import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiscapacidad } from 'app/shared/model/discapacidad.model';
import { DiscapacidadService } from './discapacidad.service';

@Component({
    selector: 'jhi-discapacidad-delete-dialog',
    templateUrl: './discapacidad-delete-dialog.component.html'
})
export class DiscapacidadDeleteDialogComponent {
    discapacidad: IDiscapacidad;

    constructor(
        private discapacidadService: DiscapacidadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discapacidadService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'discapacidadListModification',
                content: 'Deleted an discapacidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discapacidad-delete-popup',
    template: ''
})
export class DiscapacidadDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ discapacidad }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiscapacidadDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.discapacidad = discapacidad;
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
