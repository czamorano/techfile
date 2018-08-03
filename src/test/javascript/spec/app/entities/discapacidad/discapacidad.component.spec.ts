/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadComponent } from 'app/entities/discapacidad/discapacidad.component';
import { DiscapacidadService } from 'app/entities/discapacidad/discapacidad.service';
import { Discapacidad } from 'app/shared/model/discapacidad.model';

describe('Component Tests', () => {
    describe('Discapacidad Management Component', () => {
        let comp: DiscapacidadComponent;
        let fixture: ComponentFixture<DiscapacidadComponent>;
        let service: DiscapacidadService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadComponent],
                providers: []
            })
                .overrideTemplate(DiscapacidadComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiscapacidadComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapacidadService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Discapacidad(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.discapacidads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
