import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from './pensionista-my-suffix.service';

@Component({
    selector: 'jhi-pensionista-my-suffix-delete-dialog',
    templateUrl: './pensionista-my-suffix-delete-dialog.component.html'
})
export class PensionistaMySuffixDeleteDialogComponent {
    pensionista: IPensionistaMySuffix;

    constructor(
        private pensionistaService: PensionistaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pensionistaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pensionistaListModification',
                content: 'Deleted an pensionista'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pensionista-my-suffix-delete-popup',
    template: ''
})
export class PensionistaMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionista }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PensionistaMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pensionista = pensionista;
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
