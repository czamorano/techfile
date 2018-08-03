/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaUpdateComponent } from 'app/entities/regimen-procedencia/regimen-procedencia-update.component';
import { RegimenProcedenciaService } from 'app/entities/regimen-procedencia/regimen-procedencia.service';
import { RegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';

describe('Component Tests', () => {
    describe('RegimenProcedencia Management Update Component', () => {
        let comp: RegimenProcedenciaUpdateComponent;
        let fixture: ComponentFixture<RegimenProcedenciaUpdateComponent>;
        let service: RegimenProcedenciaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaUpdateComponent]
            })
                .overrideTemplate(RegimenProcedenciaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegimenProcedenciaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenProcedenciaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RegimenProcedencia(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.regimenProcedencia = entity;
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
                    const entity = new RegimenProcedencia();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.regimenProcedencia = entity;
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
