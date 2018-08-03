/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaMySuffixUpdateComponent } from 'app/entities/etiologia-my-suffix/etiologia-my-suffix-update.component';
import { EtiologiaMySuffixService } from 'app/entities/etiologia-my-suffix/etiologia-my-suffix.service';
import { EtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';

describe('Component Tests', () => {
    describe('EtiologiaMySuffix Management Update Component', () => {
        let comp: EtiologiaMySuffixUpdateComponent;
        let fixture: ComponentFixture<EtiologiaMySuffixUpdateComponent>;
        let service: EtiologiaMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaMySuffixUpdateComponent]
            })
                .overrideTemplate(EtiologiaMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EtiologiaMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EtiologiaMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.etiologia = entity;
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
                    const entity = new EtiologiaMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.etiologia = entity;
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
