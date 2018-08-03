/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadDetailComponent } from 'app/entities/discapacidad/discapacidad-detail.component';
import { Discapacidad } from 'app/shared/model/discapacidad.model';

describe('Component Tests', () => {
    describe('Discapacidad Management Detail Component', () => {
        let comp: DiscapacidadDetailComponent;
        let fixture: ComponentFixture<DiscapacidadDetailComponent>;
        const route = ({ data: of({ discapacidad: new Discapacidad(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiscapacidadDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiscapacidadDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.discapacidad).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
