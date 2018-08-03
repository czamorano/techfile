/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadUpdateComponent } from 'app/entities/discapacidad/discapacidad-update.component';
import { DiscapacidadService } from 'app/entities/discapacidad/discapacidad.service';
import { Discapacidad } from 'app/shared/model/discapacidad.model';

describe('Component Tests', () => {
    describe('Discapacidad Management Update Component', () => {
        let comp: DiscapacidadUpdateComponent;
        let fixture: ComponentFixture<DiscapacidadUpdateComponent>;
        let service: DiscapacidadService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadUpdateComponent]
            })
                .overrideTemplate(DiscapacidadUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiscapacidadUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapacidadService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Discapacidad(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.discapacidad = entity;
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
                    const entity = new Discapacidad();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.discapacidad = entity;
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
