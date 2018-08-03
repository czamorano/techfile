/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaDeleteDialogComponent } from 'app/entities/etiologia/etiologia-delete-dialog.component';
import { EtiologiaService } from 'app/entities/etiologia/etiologia.service';

describe('Component Tests', () => {
    describe('Etiologia Management Delete Component', () => {
        let comp: EtiologiaDeleteDialogComponent;
        let fixture: ComponentFixture<EtiologiaDeleteDialogComponent>;
        let service: EtiologiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaDeleteDialogComponent]
            })
                .overrideTemplate(EtiologiaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EtiologiaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaService);
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
