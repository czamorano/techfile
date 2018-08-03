import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';
import { PerceptorMySuffixService } from './perceptor-my-suffix.service';

@Component({
    selector: 'jhi-perceptor-my-suffix-delete-dialog',
    templateUrl: './perceptor-my-suffix-delete-dialog.component.html'
})
export class PerceptorMySuffixDeleteDialogComponent {
    perceptor: IPerceptorMySuffix;

    constructor(
        private perceptorService: PerceptorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perceptorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perceptorListModification',
                content: 'Deleted an perceptor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perceptor-my-suffix-delete-popup',
    template: ''
})
export class PerceptorMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perceptor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerceptorMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.perceptor = perceptor;
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
