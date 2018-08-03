/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorMySuffixDeleteDialogComponent } from 'app/entities/perceptor-my-suffix/perceptor-my-suffix-delete-dialog.component';
import { PerceptorMySuffixService } from 'app/entities/perceptor-my-suffix/perceptor-my-suffix.service';

describe('Component Tests', () => {
    describe('PerceptorMySuffix Management Delete Component', () => {
        let comp: PerceptorMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PerceptorMySuffixDeleteDialogComponent>;
        let service: PerceptorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PerceptorMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerceptorMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerceptorMySuffixService);
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
