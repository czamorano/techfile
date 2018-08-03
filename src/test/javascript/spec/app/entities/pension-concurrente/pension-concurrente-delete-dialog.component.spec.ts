/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteDeleteDialogComponent } from 'app/entities/pension-concurrente/pension-concurrente-delete-dialog.component';
import { PensionConcurrenteService } from 'app/entities/pension-concurrente/pension-concurrente.service';

describe('Component Tests', () => {
    describe('PensionConcurrente Management Delete Component', () => {
        let comp: PensionConcurrenteDeleteDialogComponent;
        let fixture: ComponentFixture<PensionConcurrenteDeleteDialogComponent>;
        let service: PensionConcurrenteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteDeleteDialogComponent]
            })
                .overrideTemplate(PensionConcurrenteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionConcurrenteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionConcurrenteService);
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
