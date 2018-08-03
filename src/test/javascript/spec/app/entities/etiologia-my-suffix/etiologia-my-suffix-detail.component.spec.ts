/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaMySuffixDetailComponent } from 'app/entities/etiologia-my-suffix/etiologia-my-suffix-detail.component';
import { EtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';

describe('Component Tests', () => {
    describe('EtiologiaMySuffix Management Detail Component', () => {
        let comp: EtiologiaMySuffixDetailComponent;
        let fixture: ComponentFixture<EtiologiaMySuffixDetailComponent>;
        const route = ({ data: of({ etiologia: new EtiologiaMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EtiologiaMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EtiologiaMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.etiologia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
