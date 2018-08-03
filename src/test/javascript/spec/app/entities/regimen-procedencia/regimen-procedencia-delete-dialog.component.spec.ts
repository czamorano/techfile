/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaDeleteDialogComponent } from 'app/entities/regimen-procedencia/regimen-procedencia-delete-dialog.component';
import { RegimenProcedenciaService } from 'app/entities/regimen-procedencia/regimen-procedencia.service';

describe('Component Tests', () => {
    describe('RegimenProcedencia Management Delete Component', () => {
        let comp: RegimenProcedenciaDeleteDialogComponent;
        let fixture: ComponentFixture<RegimenProcedenciaDeleteDialogComponent>;
        let service: RegimenProcedenciaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaDeleteDialogComponent]
            })
                .overrideTemplate(RegimenProcedenciaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegimenProcedenciaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenProcedenciaService);
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
