/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionDeleteDialogComponent } from 'app/entities/tipo-relacion/tipo-relacion-delete-dialog.component';
import { TipoRelacionService } from 'app/entities/tipo-relacion/tipo-relacion.service';

describe('Component Tests', () => {
    describe('TipoRelacion Management Delete Component', () => {
        let comp: TipoRelacionDeleteDialogComponent;
        let fixture: ComponentFixture<TipoRelacionDeleteDialogComponent>;
        let service: TipoRelacionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionDeleteDialogComponent]
            })
                .overrideTemplate(TipoRelacionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoRelacionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionService);
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
