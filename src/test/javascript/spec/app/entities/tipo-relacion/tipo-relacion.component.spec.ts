/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionComponent } from 'app/entities/tipo-relacion/tipo-relacion.component';
import { TipoRelacionService } from 'app/entities/tipo-relacion/tipo-relacion.service';
import { TipoRelacion } from 'app/shared/model/tipo-relacion.model';

describe('Component Tests', () => {
    describe('TipoRelacion Management Component', () => {
        let comp: TipoRelacionComponent;
        let fixture: ComponentFixture<TipoRelacionComponent>;
        let service: TipoRelacionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionComponent],
                providers: []
            })
                .overrideTemplate(TipoRelacionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoRelacionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoRelacion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoRelacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
