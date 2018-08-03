/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiagnosticoMySuffixUpdateComponent } from 'app/entities/diagnostico-my-suffix/diagnostico-my-suffix-update.component';
import { DiagnosticoMySuffixService } from 'app/entities/diagnostico-my-suffix/diagnostico-my-suffix.service';
import { DiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';

describe('Component Tests', () => {
    describe('DiagnosticoMySuffix Management Update Component', () => {
        let comp: DiagnosticoMySuffixUpdateComponent;
        let fixture: ComponentFixture<DiagnosticoMySuffixUpdateComponent>;
        let service: DiagnosticoMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiagnosticoMySuffixUpdateComponent]
            })
                .overrideTemplate(DiagnosticoMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiagnosticoMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosticoMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DiagnosticoMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diagnostico = entity;
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
                    const entity = new DiagnosticoMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diagnostico = entity;
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
