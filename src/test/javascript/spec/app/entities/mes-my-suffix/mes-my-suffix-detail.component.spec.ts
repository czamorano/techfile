/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { MesMySuffixDetailComponent } from 'app/entities/mes-my-suffix/mes-my-suffix-detail.component';
import { MesMySuffix } from 'app/shared/model/mes-my-suffix.model';

describe('Component Tests', () => {
    describe('MesMySuffix Management Detail Component', () => {
        let comp: MesMySuffixDetailComponent;
        let fixture: ComponentFixture<MesMySuffixDetailComponent>;
        const route = ({ data: of({ mes: new MesMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MesMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MesMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
