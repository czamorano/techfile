/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaDetailComponent } from 'app/entities/etiologia/etiologia-detail.component';
import { Etiologia } from 'app/shared/model/etiologia.model';

describe('Component Tests', () => {
    describe('Etiologia Management Detail Component', () => {
        let comp: EtiologiaDetailComponent;
        let fixture: ComponentFixture<EtiologiaDetailComponent>;
        const route = ({ data: of({ etiologia: new Etiologia(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EtiologiaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EtiologiaDetailComponent);
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
