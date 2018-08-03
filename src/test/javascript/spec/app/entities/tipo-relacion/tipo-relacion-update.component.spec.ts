/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionUpdateComponent } from 'app/entities/tipo-relacion/tipo-relacion-update.component';
import { TipoRelacionService } from 'app/entities/tipo-relacion/tipo-relacion.service';
import { TipoRelacion } from 'app/shared/model/tipo-relacion.model';

describe('Component Tests', () => {
    describe('TipoRelacion Management Update Component', () => {
        let comp: TipoRelacionUpdateComponent;
        let fixture: ComponentFixture<TipoRelacionUpdateComponent>;
        let service: TipoRelacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionUpdateComponent]
            })
                .overrideTemplate(TipoRelacionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoRelacionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoRelacion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRelacion = entity;
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
                    const entity = new TipoRelacion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRelacion = entity;
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
