/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ConvivienteMySuffixDetailComponent } from 'app/entities/conviviente-my-suffix/conviviente-my-suffix-detail.component';
import { ConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';

describe('Component Tests', () => {
    describe('ConvivienteMySuffix Management Detail Component', () => {
        let comp: ConvivienteMySuffixDetailComponent;
        let fixture: ComponentFixture<ConvivienteMySuffixDetailComponent>;
        const route = ({ data: of({ conviviente: new ConvivienteMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ConvivienteMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConvivienteMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConvivienteMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.conviviente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
