/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteUpdateComponent } from 'app/entities/fichero-byte/fichero-byte-update.component';
import { FicheroByteService } from 'app/entities/fichero-byte/fichero-byte.service';
import { FicheroByte } from 'app/shared/model/fichero-byte.model';

describe('Component Tests', () => {
    describe('FicheroByte Management Update Component', () => {
        let comp: FicheroByteUpdateComponent;
        let fixture: ComponentFixture<FicheroByteUpdateComponent>;
        let service: FicheroByteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteUpdateComponent]
            })
                .overrideTemplate(FicheroByteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroByteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroByteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheroByte(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheroByte = entity;
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
                    const entity = new FicheroByte();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheroByte = entity;
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
