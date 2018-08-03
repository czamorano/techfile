/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaDetailComponent } from 'app/entities/pensionista/pensionista-detail.component';
import { Pensionista } from 'app/shared/model/pensionista.model';

describe('Component Tests', () => {
    describe('Pensionista Management Detail Component', () => {
        let comp: PensionistaDetailComponent;
        let fixture: ComponentFixture<PensionistaDetailComponent>;
        const route = ({ data: of({ pensionista: new Pensionista(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PensionistaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionistaDetailComponent);
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
