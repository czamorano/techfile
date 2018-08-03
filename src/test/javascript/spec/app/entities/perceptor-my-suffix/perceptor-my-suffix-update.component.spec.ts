/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorMySuffixUpdateComponent } from 'app/entities/perceptor-my-suffix/perceptor-my-suffix-update.component';
import { PerceptorMySuffixService } from 'app/entities/perceptor-my-suffix/perceptor-my-suffix.service';
import { PerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';

describe('Component Tests', () => {
    describe('PerceptorMySuffix Management Update Component', () => {
        let comp: PerceptorMySuffixUpdateComponent;
        let fixture: ComponentFixture<PerceptorMySuffixUpdateComponent>;
        let service: PerceptorMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorMySuffixUpdateComponent]
            })
                .overrideTemplate(PerceptorMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerceptorMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerceptorMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerceptorMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perceptor = entity;
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
                    const entity = new PerceptorMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perceptor = entity;
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
