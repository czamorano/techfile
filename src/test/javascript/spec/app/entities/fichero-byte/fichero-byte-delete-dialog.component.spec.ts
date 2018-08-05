/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteDeleteDialogComponent } from 'app/entities/fichero-byte/fichero-byte-delete-dialog.component';
import { FicheroByteService } from 'app/entities/fichero-byte/fichero-byte.service';

describe('Component Tests', () => {
    describe('FicheroByte Management Delete Component', () => {
        let comp: FicheroByteDeleteDialogComponent;
        let fixture: ComponentFixture<FicheroByteDeleteDialogComponent>;
        let service: FicheroByteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteDeleteDialogComponent]
            })
                .overrideTemplate(FicheroByteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroByteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroByteService);
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
