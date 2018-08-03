/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaComponent } from 'app/entities/etiologia/etiologia.component';
import { EtiologiaService } from 'app/entities/etiologia/etiologia.service';
import { Etiologia } from 'app/shared/model/etiologia.model';

describe('Component Tests', () => {
    describe('Etiologia Management Component', () => {
        let comp: EtiologiaComponent;
        let fixture: ComponentFixture<EtiologiaComponent>;
        let service: EtiologiaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaComponent],
                providers: []
            })
                .overrideTemplate(EtiologiaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EtiologiaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Etiologia(123)],
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
