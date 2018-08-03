/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { MesUpdateComponent } from 'app/entities/mes/mes-update.component';
import { MesService } from 'app/entities/mes/mes.service';
import { Mes } from 'app/shared/model/mes.model';

describe('Component Tests', () => {
    describe('Mes Management Update Component', () => {
        let comp: MesUpdateComponent;
        let fixture: ComponentFixture<MesUpdateComponent>;
        let service: MesService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesUpdateComponent]
            })
                .overrideTemplate(MesUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MesUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MesService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Mes(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mes = entity;
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
                    const entity = new Mes();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mes = entity;
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
