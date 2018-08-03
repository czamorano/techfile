import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';
import { ProvinciaMySuffixService } from './provincia-my-suffix.service';

@Component({
    selector: 'jhi-provincia-my-suffix-delete-dialog',
    templateUrl: './provincia-my-suffix-delete-dialog.component.html'
})
export class ProvinciaMySuffixDeleteDialogComponent {
    provincia: IProvinciaMySuffix;

    constructor(
        private provinciaService: ProvinciaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.provinciaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'provinciaListModification',
                content: 'Deleted an provincia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provincia-my-suffix-delete-popup',
    template: ''
})
export class ProvinciaMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ provincia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProvinciaMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.provincia = provincia;
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
