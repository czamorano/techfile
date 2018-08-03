/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaMySuffixUpdateComponent } from 'app/entities/regimen-procedencia-my-suffix/regimen-procedencia-my-suffix-update.component';
import { RegimenProcedenciaMySuffixService } from 'app/entities/regimen-procedencia-my-suffix/regimen-procedencia-my-suffix.service';
import { RegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';

describe('Component Tests', () => {
    describe('RegimenProcedenciaMySuffix Management Update Component', () => {
        let comp: RegimenProcedenciaMySuffixUpdateComponent;
        let fixture: ComponentFixture<RegimenProcedenciaMySuffixUpdateComponent>;
        let service: RegimenProcedenciaMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaMySuffixUpdateComponent]
            })
                .overrideTemplate(RegimenProcedenciaMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegimenProcedenciaMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenProcedenciaMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RegimenProcedenciaMySuffix(123);
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
                    const entity = new RegimenProcedenciaMySuffix();
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
