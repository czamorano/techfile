/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { MesDeleteDialogComponent } from 'app/entities/mes/mes-delete-dialog.component';
import { MesService } from 'app/entities/mes/mes.service';

describe('Component Tests', () => {
    describe('Mes Management Delete Component', () => {
        let comp: MesDeleteDialogComponent;
        let fixture: ComponentFixture<MesDeleteDialogComponent>;
        let service: MesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesDeleteDialogComponent]
            })
                .overrideTemplate(MesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MesService);
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
