/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteMySuffixDetailComponent } from 'app/entities/pension-concurrente-my-suffix/pension-concurrente-my-suffix-detail.component';
import { PensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';

describe('Component Tests', () => {
    describe('PensionConcurrenteMySuffix Management Detail Component', () => {
        let comp: PensionConcurrenteMySuffixDetailComponent;
        let fixture: ComponentFixture<PensionConcurrenteMySuffixDetailComponent>;
        const route = ({ data: of({ pensionConcurrente: new PensionConcurrenteMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PensionConcurrenteMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionConcurrenteMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pensionConcurrente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
