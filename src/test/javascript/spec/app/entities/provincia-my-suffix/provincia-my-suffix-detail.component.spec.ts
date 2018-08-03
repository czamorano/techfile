/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ProvinciaMySuffixDetailComponent } from 'app/entities/provincia-my-suffix/provincia-my-suffix-detail.component';
import { ProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';

describe('Component Tests', () => {
    describe('ProvinciaMySuffix Management Detail Component', () => {
        let comp: ProvinciaMySuffixDetailComponent;
        let fixture: ComponentFixture<ProvinciaMySuffixDetailComponent>;
        const route = ({ data: of({ provincia: new ProvinciaMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProvinciaMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProvinciaMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProvinciaMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.provincia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
