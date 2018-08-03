/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaUpdateComponent } from 'app/entities/pensionista/pensionista-update.component';
import { PensionistaService } from 'app/entities/pensionista/pensionista.service';
import { Pensionista } from 'app/shared/model/pensionista.model';

describe('Component Tests', () => {
    describe('Pensionista Management Update Component', () => {
        let comp: PensionistaUpdateComponent;
        let fixture: ComponentFixture<PensionistaUpdateComponent>;
        let service: PensionistaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaUpdateComponent]
            })
                .overrideTemplate(PensionistaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PensionistaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionistaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Pensionista(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionista = entity;
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
                    const entity = new Pensionista();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionista = entity;
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
