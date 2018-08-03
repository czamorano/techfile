import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';
import { FicheroMySuffixService } from './fichero-my-suffix.service';

@Component({
    selector: 'jhi-fichero-my-suffix-delete-dialog',
    templateUrl: './fichero-my-suffix-delete-dialog.component.html'
})
export class FicheroMySuffixDeleteDialogComponent {
    fichero: IFicheroMySuffix;

    constructor(
        private ficheroService: FicheroMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheroService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheroListModification',
                content: 'Deleted an fichero'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fichero-my-suffix-delete-popup',
    template: ''
})
export class FicheroMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fichero }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheroMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.fichero = fichero;
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
