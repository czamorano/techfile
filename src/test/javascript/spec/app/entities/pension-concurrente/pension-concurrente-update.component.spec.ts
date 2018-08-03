/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteUpdateComponent } from 'app/entities/pension-concurrente/pension-concurrente-update.component';
import { PensionConcurrenteService } from 'app/entities/pension-concurrente/pension-concurrente.service';
import { PensionConcurrente } from 'app/shared/model/pension-concurrente.model';

describe('Component Tests', () => {
    describe('PensionConcurrente Management Update Component', () => {
        let comp: PensionConcurrenteUpdateComponent;
        let fixture: ComponentFixture<PensionConcurrenteUpdateComponent>;
        let service: PensionConcurrenteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteUpdateComponent]
            })
                .overrideTemplate(PensionConcurrenteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PensionConcurrenteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionConcurrenteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PensionConcurrente(123);
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
                    const entity = new PensionConcurrente();
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
