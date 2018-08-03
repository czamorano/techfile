/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { MesDetailComponent } from 'app/entities/mes/mes-detail.component';
import { Mes } from 'app/shared/model/mes.model';

describe('Component Tests', () => {
    describe('Mes Management Detail Component', () => {
        let comp: MesDetailComponent;
        let fixture: ComponentFixture<MesDetailComponent>;
        const route = ({ data: of({ mes: new Mes(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MesDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MesDetailComponent);
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
