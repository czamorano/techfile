/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { UsuarioMySuffixUpdateComponent } from 'app/entities/usuario-my-suffix/usuario-my-suffix-update.component';
import { UsuarioMySuffixService } from 'app/entities/usuario-my-suffix/usuario-my-suffix.service';
import { UsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';

describe('Component Tests', () => {
    describe('UsuarioMySuffix Management Update Component', () => {
        let comp: UsuarioMySuffixUpdateComponent;
        let fixture: ComponentFixture<UsuarioMySuffixUpdateComponent>;
        let service: UsuarioMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [UsuarioMySuffixUpdateComponent]
            })
                .overrideTemplate(UsuarioMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsuarioMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UsuarioMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usuario = entity;
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
                    const entity = new UsuarioMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usuario = entity;
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
