/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaComponent } from 'app/entities/regimen-procedencia/regimen-procedencia.component';
import { RegimenProcedenciaService } from 'app/entities/regimen-procedencia/regimen-procedencia.service';
import { RegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';

describe('Component Tests', () => {
    describe('RegimenProcedencia Management Component', () => {
        let comp: RegimenProcedenciaComponent;
        let fixture: ComponentFixture<RegimenProcedenciaComponent>;
        let service: RegimenProcedenciaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaComponent],
                providers: []
            })
                .overrideTemplate(RegimenProcedenciaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegimenProcedenciaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenProcedenciaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RegimenProcedencia(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.regimenProcedencias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
