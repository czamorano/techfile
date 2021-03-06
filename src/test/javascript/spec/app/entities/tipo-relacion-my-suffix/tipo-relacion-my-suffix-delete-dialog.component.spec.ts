/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionMySuffixDeleteDialogComponent } from 'app/entities/tipo-relacion-my-suffix/tipo-relacion-my-suffix-delete-dialog.component';
import { TipoRelacionMySuffixService } from 'app/entities/tipo-relacion-my-suffix/tipo-relacion-my-suffix.service';

describe('Component Tests', () => {
    describe('TipoRelacionMySuffix Management Delete Component', () => {
        let comp: TipoRelacionMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TipoRelacionMySuffixDeleteDialogComponent>;
        let service: TipoRelacionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TipoRelacionMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoRelacionMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionMySuffixService);
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
