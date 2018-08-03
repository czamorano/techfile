/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ConvivienteMySuffixUpdateComponent } from 'app/entities/conviviente-my-suffix/conviviente-my-suffix-update.component';
import { ConvivienteMySuffixService } from 'app/entities/conviviente-my-suffix/conviviente-my-suffix.service';
import { ConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';

describe('Component Tests', () => {
    describe('ConvivienteMySuffix Management Update Component', () => {
        let comp: ConvivienteMySuffixUpdateComponent;
        let fixture: ComponentFixture<ConvivienteMySuffixUpdateComponent>;
        let service: ConvivienteMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ConvivienteMySuffixUpdateComponent]
            })
                .overrideTemplate(ConvivienteMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConvivienteMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConvivienteMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ConvivienteMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.conviviente = entity;
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
                    const entity = new ConvivienteMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.conviviente = entity;
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
