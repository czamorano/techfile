/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PersonaMySuffixDeleteDialogComponent } from 'app/entities/persona-my-suffix/persona-my-suffix-delete-dialog.component';
import { PersonaMySuffixService } from 'app/entities/persona-my-suffix/persona-my-suffix.service';

describe('Component Tests', () => {
    describe('PersonaMySuffix Management Delete Component', () => {
        let comp: PersonaMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PersonaMySuffixDeleteDialogComponent>;
        let service: PersonaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PersonaMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PersonaMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonaMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaMySuffixService);
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
