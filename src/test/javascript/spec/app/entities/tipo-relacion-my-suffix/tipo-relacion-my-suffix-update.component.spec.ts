/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionMySuffixUpdateComponent } from 'app/entities/tipo-relacion-my-suffix/tipo-relacion-my-suffix-update.component';
import { TipoRelacionMySuffixService } from 'app/entities/tipo-relacion-my-suffix/tipo-relacion-my-suffix.service';
import { TipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';

describe('Component Tests', () => {
    describe('TipoRelacionMySuffix Management Update Component', () => {
        let comp: TipoRelacionMySuffixUpdateComponent;
        let fixture: ComponentFixture<TipoRelacionMySuffixUpdateComponent>;
        let service: TipoRelacionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionMySuffixUpdateComponent]
            })
                .overrideTemplate(TipoRelacionMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoRelacionMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoRelacionMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRelacion = entity;
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
                    const entity = new TipoRelacionMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRelacion = entity;
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
