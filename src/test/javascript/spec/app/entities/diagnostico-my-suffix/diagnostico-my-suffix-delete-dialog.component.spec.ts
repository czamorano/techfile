/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { DiagnosticoMySuffixDeleteDialogComponent } from 'app/entities/diagnostico-my-suffix/diagnostico-my-suffix-delete-dialog.component';
import { DiagnosticoMySuffixService } from 'app/entities/diagnostico-my-suffix/diagnostico-my-suffix.service';

describe('Component Tests', () => {
    describe('DiagnosticoMySuffix Management Delete Component', () => {
        let comp: DiagnosticoMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DiagnosticoMySuffixDeleteDialogComponent>;
        let service: DiagnosticoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiagnosticoMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(DiagnosticoMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiagnosticoMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosticoMySuffixService);
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
