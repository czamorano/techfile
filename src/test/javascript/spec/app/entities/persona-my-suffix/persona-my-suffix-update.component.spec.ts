/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PersonaMySuffixUpdateComponent } from 'app/entities/persona-my-suffix/persona-my-suffix-update.component';
import { PersonaMySuffixService } from 'app/entities/persona-my-suffix/persona-my-suffix.service';
import { PersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';

describe('Component Tests', () => {
    describe('PersonaMySuffix Management Update Component', () => {
        let comp: PersonaMySuffixUpdateComponent;
        let fixture: ComponentFixture<PersonaMySuffixUpdateComponent>;
        let service: PersonaMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PersonaMySuffixUpdateComponent]
            })
                .overrideTemplate(PersonaMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonaMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PersonaMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.persona = entity;
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
                    const entity = new PersonaMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.persona = entity;
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
