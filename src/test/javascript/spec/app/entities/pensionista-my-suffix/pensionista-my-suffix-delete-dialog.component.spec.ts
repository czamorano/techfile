/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaMySuffixDeleteDialogComponent } from 'app/entities/pensionista-my-suffix/pensionista-my-suffix-delete-dialog.component';
import { PensionistaMySuffixService } from 'app/entities/pensionista-my-suffix/pensionista-my-suffix.service';

describe('Component Tests', () => {
    describe('PensionistaMySuffix Management Delete Component', () => {
        let comp: PensionistaMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PensionistaMySuffixDeleteDialogComponent>;
        let service: PensionistaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PensionistaMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionistaMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionistaMySuffixService);
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
