import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';
import { ConvivienteMySuffixService } from './conviviente-my-suffix.service';

@Component({
    selector: 'jhi-conviviente-my-suffix-delete-dialog',
    templateUrl: './conviviente-my-suffix-delete-dialog.component.html'
})
export class ConvivienteMySuffixDeleteDialogComponent {
    conviviente: IConvivienteMySuffix;

    constructor(
        private convivienteService: ConvivienteMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.convivienteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'convivienteListModification',
                content: 'Deleted an conviviente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conviviente-my-suffix-delete-popup',
    template: ''
})
export class ConvivienteMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ conviviente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConvivienteMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.conviviente = conviviente;
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
