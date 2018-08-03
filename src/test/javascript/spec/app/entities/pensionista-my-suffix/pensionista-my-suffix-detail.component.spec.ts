/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaMySuffixDetailComponent } from 'app/entities/pensionista-my-suffix/pensionista-my-suffix-detail.component';
import { PensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';

describe('Component Tests', () => {
    describe('PensionistaMySuffix Management Detail Component', () => {
        let comp: PensionistaMySuffixDetailComponent;
        let fixture: ComponentFixture<PensionistaMySuffixDetailComponent>;
        const route = ({ data: of({ pensionista: new PensionistaMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PensionistaMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionistaMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pensionista).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
