/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { FicheroMySuffixDeleteDialogComponent } from 'app/entities/fichero-my-suffix/fichero-my-suffix-delete-dialog.component';
import { FicheroMySuffixService } from 'app/entities/fichero-my-suffix/fichero-my-suffix.service';

describe('Component Tests', () => {
    describe('FicheroMySuffix Management Delete Component', () => {
        let comp: FicheroMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FicheroMySuffixDeleteDialogComponent>;
        let service: FicheroMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(FicheroMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
