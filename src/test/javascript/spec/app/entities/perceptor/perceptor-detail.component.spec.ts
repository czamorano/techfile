/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorDetailComponent } from 'app/entities/perceptor/perceptor-detail.component';
import { Perceptor } from 'app/shared/model/perceptor.model';

describe('Component Tests', () => {
    describe('Perceptor Management Detail Component', () => {
        let comp: PerceptorDetailComponent;
        let fixture: ComponentFixture<PerceptorDetailComponent>;
        const route = ({ data: of({ perceptor: new Perceptor(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerceptorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerceptorDetailComponent);
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
