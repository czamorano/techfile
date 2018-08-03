/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ConvivienteUpdateComponent } from 'app/entities/conviviente/conviviente-update.component';
import { ConvivienteService } from 'app/entities/conviviente/conviviente.service';
import { Conviviente } from 'app/shared/model/conviviente.model';

describe('Component Tests', () => {
    describe('Conviviente Management Update Component', () => {
        let comp: ConvivienteUpdateComponent;
        let fixture: ComponentFixture<ConvivienteUpdateComponent>;
        let service: ConvivienteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ConvivienteUpdateComponent]
            })
                .overrideTemplate(ConvivienteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConvivienteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConvivienteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Conviviente(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.conviviente = entity;
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
                    const entity = new Conviviente();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.conviviente = entity;
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
