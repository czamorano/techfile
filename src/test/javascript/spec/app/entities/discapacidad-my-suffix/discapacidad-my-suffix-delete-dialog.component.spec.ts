/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadMySuffixDeleteDialogComponent } from 'app/entities/discapacidad-my-suffix/discapacidad-my-suffix-delete-dialog.component';
import { DiscapacidadMySuffixService } from 'app/entities/discapacidad-my-suffix/discapacidad-my-suffix.service';

describe('Component Tests', () => {
    describe('DiscapacidadMySuffix Management Delete Component', () => {
        let comp: DiscapacidadMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DiscapacidadMySuffixDeleteDialogComponent>;
        let service: DiscapacidadMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(DiscapacidadMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiscapacidadMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapacidadMySuffixService);
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
