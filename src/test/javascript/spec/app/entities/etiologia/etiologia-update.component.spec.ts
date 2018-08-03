/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaUpdateComponent } from 'app/entities/etiologia/etiologia-update.component';
import { EtiologiaService } from 'app/entities/etiologia/etiologia.service';
import { Etiologia } from 'app/shared/model/etiologia.model';

describe('Component Tests', () => {
    describe('Etiologia Management Update Component', () => {
        let comp: EtiologiaUpdateComponent;
        let fixture: ComponentFixture<EtiologiaUpdateComponent>;
        let service: EtiologiaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaUpdateComponent]
            })
                .overrideTemplate(EtiologiaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EtiologiaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Etiologia(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.etiologia = entity;
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
                    const entity = new Etiologia();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.etiologia = entity;
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
