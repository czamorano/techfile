/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { AutonomiaDeleteDialogComponent } from 'app/entities/autonomia/autonomia-delete-dialog.component';
import { AutonomiaService } from 'app/entities/autonomia/autonomia.service';

describe('Component Tests', () => {
    describe('Autonomia Management Delete Component', () => {
        let comp: AutonomiaDeleteDialogComponent;
        let fixture: ComponentFixture<AutonomiaDeleteDialogComponent>;
        let service: AutonomiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [AutonomiaDeleteDialogComponent]
            })
                .overrideTemplate(AutonomiaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AutonomiaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutonomiaService);
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
