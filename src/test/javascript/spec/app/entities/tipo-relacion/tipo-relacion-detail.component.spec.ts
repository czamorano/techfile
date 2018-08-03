/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionDetailComponent } from 'app/entities/tipo-relacion/tipo-relacion-detail.component';
import { TipoRelacion } from 'app/shared/model/tipo-relacion.model';

describe('Component Tests', () => {
    describe('TipoRelacion Management Detail Component', () => {
        let comp: TipoRelacionDetailComponent;
        let fixture: ComponentFixture<TipoRelacionDetailComponent>;
        const route = ({ data: of({ tipoRelacion: new TipoRelacion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoRelacionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoRelacionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoRelacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
