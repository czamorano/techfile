import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';
import { PersonaMySuffixService } from './persona-my-suffix.service';

@Component({
    selector: 'jhi-persona-my-suffix-delete-dialog',
    templateUrl: './persona-my-suffix-delete-dialog.component.html'
})
export class PersonaMySuffixDeleteDialogComponent {
    persona: IPersonaMySuffix;

    constructor(
        private personaService: PersonaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'personaListModification',
                content: 'Deleted an persona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-persona-my-suffix-delete-popup',
    template: ''
})
export class PersonaMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ persona }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PersonaMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.persona = persona;
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
