import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoRelacion } from 'app/shared/model/tipo-relacion.model';
import { TipoRelacionService } from './tipo-relacion.service';

@Component({
    selector: 'jhi-tipo-relacion-delete-dialog',
    templateUrl: './tipo-relacion-delete-dialog.component.html'
})
export class TipoRelacionDeleteDialogComponent {
    tipoRelacion: ITipoRelacion;

    constructor(
        private tipoRelacionService: TipoRelacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoRelacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoRelacionListModification',
                content: 'Deleted an tipoRelacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-relacion-delete-popup',
    template: ''
})
export class TipoRelacionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoRelacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoRelacionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoRelacion = tipoRelacion;
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
