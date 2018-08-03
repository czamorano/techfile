/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorMySuffixDetailComponent } from 'app/entities/perceptor-my-suffix/perceptor-my-suffix-detail.component';
import { PerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';

describe('Component Tests', () => {
    describe('PerceptorMySuffix Management Detail Component', () => {
        let comp: PerceptorMySuffixDetailComponent;
        let fixture: ComponentFixture<PerceptorMySuffixDetailComponent>;
        const route = ({ data: of({ perceptor: new PerceptorMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerceptorMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerceptorMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perceptor).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
