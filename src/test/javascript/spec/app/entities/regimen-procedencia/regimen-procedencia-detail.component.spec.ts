/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaDetailComponent } from 'app/entities/regimen-procedencia/regimen-procedencia-detail.component';
import { RegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';

describe('Component Tests', () => {
    describe('RegimenProcedencia Management Detail Component', () => {
        let comp: RegimenProcedenciaDetailComponent;
        let fixture: ComponentFixture<RegimenProcedenciaDetailComponent>;
        const route = ({ data: of({ regimenProcedencia: new RegimenProcedencia(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RegimenProcedenciaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegimenProcedenciaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.regimenProcedencia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
