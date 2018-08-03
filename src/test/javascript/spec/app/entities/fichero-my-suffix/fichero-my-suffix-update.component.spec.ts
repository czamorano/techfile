/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroMySuffixUpdateComponent } from 'app/entities/fichero-my-suffix/fichero-my-suffix-update.component';
import { FicheroMySuffixService } from 'app/entities/fichero-my-suffix/fichero-my-suffix.service';
import { FicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';

describe('Component Tests', () => {
    describe('FicheroMySuffix Management Update Component', () => {
        let comp: FicheroMySuffixUpdateComponent;
        let fixture: ComponentFixture<FicheroMySuffixUpdateComponent>;
        let service: FicheroMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroMySuffixUpdateComponent]
            })
                .overrideTemplate(FicheroMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheroMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fichero = entity;
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
                    const entity = new FicheroMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fichero = entity;
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
