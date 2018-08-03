/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteMySuffixUpdateComponent } from 'app/entities/fichero-byte-my-suffix/fichero-byte-my-suffix-update.component';
import { FicheroByteMySuffixService } from 'app/entities/fichero-byte-my-suffix/fichero-byte-my-suffix.service';
import { FicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';

describe('Component Tests', () => {
    describe('FicheroByteMySuffix Management Update Component', () => {
        let comp: FicheroByteMySuffixUpdateComponent;
        let fixture: ComponentFixture<FicheroByteMySuffixUpdateComponent>;
        let service: FicheroByteMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteMySuffixUpdateComponent]
            })
                .overrideTemplate(FicheroByteMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroByteMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroByteMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheroByteMySuffix(123);
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
                    const entity = new FicheroByteMySuffix();
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
