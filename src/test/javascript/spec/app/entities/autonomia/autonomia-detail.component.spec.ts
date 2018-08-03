/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { AutonomiaDetailComponent } from 'app/entities/autonomia/autonomia-detail.component';
import { Autonomia } from 'app/shared/model/autonomia.model';

describe('Component Tests', () => {
    describe('Autonomia Management Detail Component', () => {
        let comp: AutonomiaDetailComponent;
        let fixture: ComponentFixture<AutonomiaDetailComponent>;
        const route = ({ data: of({ autonomia: new Autonomia(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [AutonomiaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AutonomiaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AutonomiaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.autonomia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
