/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ConvivienteDetailComponent } from 'app/entities/conviviente/conviviente-detail.component';
import { Conviviente } from 'app/shared/model/conviviente.model';

describe('Component Tests', () => {
    describe('Conviviente Management Detail Component', () => {
        let comp: ConvivienteDetailComponent;
        let fixture: ComponentFixture<ConvivienteDetailComponent>;
        const route = ({ data: of({ conviviente: new Conviviente(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ConvivienteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConvivienteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConvivienteDetailComponent);
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
