/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ProvinciaMySuffixUpdateComponent } from 'app/entities/provincia-my-suffix/provincia-my-suffix-update.component';
import { ProvinciaMySuffixService } from 'app/entities/provincia-my-suffix/provincia-my-suffix.service';
import { ProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';

describe('Component Tests', () => {
    describe('ProvinciaMySuffix Management Update Component', () => {
        let comp: ProvinciaMySuffixUpdateComponent;
        let fixture: ComponentFixture<ProvinciaMySuffixUpdateComponent>;
        let service: ProvinciaMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProvinciaMySuffixUpdateComponent]
            })
                .overrideTemplate(ProvinciaMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProvinciaMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinciaMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProvinciaMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.provincia = entity;
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
                    const entity = new ProvinciaMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.provincia = entity;
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
