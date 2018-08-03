/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteMySuffixDeleteDialogComponent } from 'app/entities/fichero-byte-my-suffix/fichero-byte-my-suffix-delete-dialog.component';
import { FicheroByteMySuffixService } from 'app/entities/fichero-byte-my-suffix/fichero-byte-my-suffix.service';

describe('Component Tests', () => {
    describe('FicheroByteMySuffix Management Delete Component', () => {
        let comp: FicheroByteMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FicheroByteMySuffixDeleteDialogComponent>;
        let service: FicheroByteMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(FicheroByteMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroByteMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroByteMySuffixService);
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
