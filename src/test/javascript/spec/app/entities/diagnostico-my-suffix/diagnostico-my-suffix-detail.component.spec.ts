/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiagnosticoMySuffixDetailComponent } from 'app/entities/diagnostico-my-suffix/diagnostico-my-suffix-detail.component';
import { DiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';

describe('Component Tests', () => {
    describe('DiagnosticoMySuffix Management Detail Component', () => {
        let comp: DiagnosticoMySuffixDetailComponent;
        let fixture: ComponentFixture<DiagnosticoMySuffixDetailComponent>;
        const route = ({ data: of({ diagnostico: new DiagnosticoMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiagnosticoMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiagnosticoMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiagnosticoMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.diagnostico).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
