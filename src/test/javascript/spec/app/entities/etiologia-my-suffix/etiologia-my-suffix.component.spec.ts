/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaMySuffixComponent } from 'app/entities/etiologia-my-suffix/etiologia-my-suffix.component';
import { EtiologiaMySuffixService } from 'app/entities/etiologia-my-suffix/etiologia-my-suffix.service';
import { EtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';

describe('Component Tests', () => {
    describe('EtiologiaMySuffix Management Component', () => {
        let comp: EtiologiaMySuffixComponent;
        let fixture: ComponentFixture<EtiologiaMySuffixComponent>;
        let service: EtiologiaMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaMySuffixComponent],
                providers: []
            })
                .overrideTemplate(EtiologiaMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EtiologiaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EtiologiaMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.etiologias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
