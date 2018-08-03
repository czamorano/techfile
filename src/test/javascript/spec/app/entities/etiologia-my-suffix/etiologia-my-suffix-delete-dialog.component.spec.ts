/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaMySuffixDeleteDialogComponent } from 'app/entities/etiologia-my-suffix/etiologia-my-suffix-delete-dialog.component';
import { EtiologiaMySuffixService } from 'app/entities/etiologia-my-suffix/etiologia-my-suffix.service';

describe('Component Tests', () => {
    describe('EtiologiaMySuffix Management Delete Component', () => {
        let comp: EtiologiaMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EtiologiaMySuffixDeleteDialogComponent>;
        let service: EtiologiaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(EtiologiaMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EtiologiaMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaMySuffixService);
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
