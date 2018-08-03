/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteMySuffixUpdateComponent } from 'app/entities/pension-concurrente-my-suffix/pension-concurrente-my-suffix-update.component';
import { PensionConcurrenteMySuffixService } from 'app/entities/pension-concurrente-my-suffix/pension-concurrente-my-suffix.service';
import { PensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';

describe('Component Tests', () => {
    describe('PensionConcurrenteMySuffix Management Update Component', () => {
        let comp: PensionConcurrenteMySuffixUpdateComponent;
        let fixture: ComponentFixture<PensionConcurrenteMySuffixUpdateComponent>;
        let service: PensionConcurrenteMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteMySuffixUpdateComponent]
            })
                .overrideTemplate(PensionConcurrenteMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PensionConcurrenteMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionConcurrenteMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PensionConcurrenteMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionConcurrente = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PensionConcurrenteMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionConcurrente = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
