/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorDeleteDialogComponent } from 'app/entities/perceptor/perceptor-delete-dialog.component';
import { PerceptorService } from 'app/entities/perceptor/perceptor.service';

describe('Component Tests', () => {
    describe('Perceptor Management Delete Component', () => {
        let comp: PerceptorDeleteDialogComponent;
        let fixture: ComponentFixture<PerceptorDeleteDialogComponent>;
        let service: PerceptorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorDeleteDialogComponent]
            })
                .overrideTemplate(PerceptorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerceptorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerceptorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
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
            ));
        });
    });
});
