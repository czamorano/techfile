import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAutonomia } from 'app/shared/model/autonomia.model';
import { AutonomiaService } from './autonomia.service';

@Component({
    selector: 'jhi-autonomia-delete-dialog',
    templateUrl: './autonomia-delete-dialog.component.html'
})
export class AutonomiaDeleteDialogComponent {
    autonomia: IAutonomia;

    constructor(private autonomiaService: AutonomiaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.autonomiaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'autonomiaListModification',
                content: 'Deleted an autonomia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-autonomia-delete-popup',
    template: ''
})
export class AutonomiaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ autonomia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AutonomiaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.autonomia = autonomia;
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
