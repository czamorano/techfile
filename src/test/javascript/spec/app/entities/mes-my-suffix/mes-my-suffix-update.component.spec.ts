/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { MesMySuffixUpdateComponent } from 'app/entities/mes-my-suffix/mes-my-suffix-update.component';
import { MesMySuffixService } from 'app/entities/mes-my-suffix/mes-my-suffix.service';
import { MesMySuffix } from 'app/shared/model/mes-my-suffix.model';

describe('Component Tests', () => {
    describe('MesMySuffix Management Update Component', () => {
        let comp: MesMySuffixUpdateComponent;
        let fixture: ComponentFixture<MesMySuffixUpdateComponent>;
        let service: MesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesMySuffixUpdateComponent]
            })
                .overrideTemplate(MesMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MesMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MesMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MesMySuffix(123);
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
                    const entity = new MesMySuffix();
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
