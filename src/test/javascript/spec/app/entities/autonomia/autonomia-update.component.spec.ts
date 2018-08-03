/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { AutonomiaUpdateComponent } from 'app/entities/autonomia/autonomia-update.component';
import { AutonomiaService } from 'app/entities/autonomia/autonomia.service';
import { Autonomia } from 'app/shared/model/autonomia.model';

describe('Component Tests', () => {
    describe('Autonomia Management Update Component', () => {
        let comp: AutonomiaUpdateComponent;
        let fixture: ComponentFixture<AutonomiaUpdateComponent>;
        let service: AutonomiaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [AutonomiaUpdateComponent]
            })
                .overrideTemplate(AutonomiaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AutonomiaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutonomiaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Autonomia(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.autonomia = entity;
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
                    const entity = new Autonomia();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.autonomia = entity;
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
