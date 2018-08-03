/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionMySuffixDetailComponent } from 'app/entities/tipo-relacion-my-suffix/tipo-relacion-my-suffix-detail.component';
import { TipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';

describe('Component Tests', () => {
    describe('TipoRelacionMySuffix Management Detail Component', () => {
        let comp: TipoRelacionMySuffixDetailComponent;
        let fixture: ComponentFixture<TipoRelacionMySuffixDetailComponent>;
        const route = ({ data: of({ tipoRelacion: new TipoRelacionMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoRelacionMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoRelacionMySuffixDetailComponent);
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
