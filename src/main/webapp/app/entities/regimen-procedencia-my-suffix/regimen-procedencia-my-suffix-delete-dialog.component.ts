import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';
import { RegimenProcedenciaMySuffixService } from './regimen-procedencia-my-suffix.service';

@Component({
    selector: 'jhi-regimen-procedencia-my-suffix-delete-dialog',
    templateUrl: './regimen-procedencia-my-suffix-delete-dialog.component.html'
})
export class RegimenProcedenciaMySuffixDeleteDialogComponent {
    regimenProcedencia: IRegimenProcedenciaMySuffix;

    constructor(
        private regimenProcedenciaService: RegimenProcedenciaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regimenProcedenciaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'regimenProcedenciaListModification',
                content: 'Deleted an regimenProcedencia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-regimen-procedencia-my-suffix-delete-popup',
    template: ''
})
export class RegimenProcedenciaMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ regimenProcedencia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RegimenProcedenciaMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.regimenProcedencia = regimenProcedencia;
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
