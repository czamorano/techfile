import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheroByte } from 'app/shared/model/fichero-byte.model';
import { FicheroByteService } from './fichero-byte.service';

@Component({
    selector: 'jhi-fichero-byte-delete-dialog',
    templateUrl: './fichero-byte-delete-dialog.component.html'
})
export class FicheroByteDeleteDialogComponent {
    ficheroByte: IFicheroByte;

    constructor(
        private ficheroByteService: FicheroByteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheroByteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheroByteListModification',
                content: 'Deleted an ficheroByte'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fichero-byte-delete-popup',
    template: ''
})
export class FicheroByteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ficheroByte }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheroByteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ficheroByte = ficheroByte;
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
