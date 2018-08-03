/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaMySuffixDetailComponent } from 'app/entities/regimen-procedencia-my-suffix/regimen-procedencia-my-suffix-detail.component';
import { RegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';

describe('Component Tests', () => {
    describe('RegimenProcedenciaMySuffix Management Detail Component', () => {
        let comp: RegimenProcedenciaMySuffixDetailComponent;
        let fixture: ComponentFixture<RegimenProcedenciaMySuffixDetailComponent>;
        const route = ({ data: of({ regimenProcedencia: new RegimenProcedenciaMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RegimenProcedenciaMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegimenProcedenciaMySuffixDetailComponent);
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
