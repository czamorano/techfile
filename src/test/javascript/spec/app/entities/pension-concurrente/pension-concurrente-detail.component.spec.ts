/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteDetailComponent } from 'app/entities/pension-concurrente/pension-concurrente-detail.component';
import { PensionConcurrente } from 'app/shared/model/pension-concurrente.model';

describe('Component Tests', () => {
    describe('PensionConcurrente Management Detail Component', () => {
        let comp: PensionConcurrenteDetailComponent;
        let fixture: ComponentFixture<PensionConcurrenteDetailComponent>;
        const route = ({ data: of({ pensionConcurrente: new PensionConcurrente(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PensionConcurrenteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionConcurrenteDetailComponent);
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
