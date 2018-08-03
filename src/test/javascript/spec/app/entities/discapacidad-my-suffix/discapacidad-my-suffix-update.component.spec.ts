/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadMySuffixUpdateComponent } from 'app/entities/discapacidad-my-suffix/discapacidad-my-suffix-update.component';
import { DiscapacidadMySuffixService } from 'app/entities/discapacidad-my-suffix/discapacidad-my-suffix.service';
import { DiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';

describe('Component Tests', () => {
    describe('DiscapacidadMySuffix Management Update Component', () => {
        let comp: DiscapacidadMySuffixUpdateComponent;
        let fixture: ComponentFixture<DiscapacidadMySuffixUpdateComponent>;
        let service: DiscapacidadMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadMySuffixUpdateComponent]
            })
                .overrideTemplate(DiscapacidadMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiscapacidadMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapacidadMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DiscapacidadMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.discapacidad = entity;
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
                    const entity = new DiscapacidadMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.discapacidad = entity;
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
