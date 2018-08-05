/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaDeleteDialogComponent } from 'app/entities/pensionista/pensionista-delete-dialog.component';
import { PensionistaService } from 'app/entities/pensionista/pensionista.service';

describe('Component Tests', () => {
    describe('Pensionista Management Delete Component', () => {
        let comp: PensionistaDeleteDialogComponent;
        let fixture: ComponentFixture<PensionistaDeleteDialogComponent>;
        let service: PensionistaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaDeleteDialogComponent]
            })
                .overrideTemplate(PensionistaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionistaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionistaService);
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
