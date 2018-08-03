/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadMySuffixDetailComponent } from 'app/entities/discapacidad-my-suffix/discapacidad-my-suffix-detail.component';
import { DiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';

describe('Component Tests', () => {
    describe('DiscapacidadMySuffix Management Detail Component', () => {
        let comp: DiscapacidadMySuffixDetailComponent;
        let fixture: ComponentFixture<DiscapacidadMySuffixDetailComponent>;
        const route = ({ data: of({ discapacidad: new DiscapacidadMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiscapacidadMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiscapacidadMySuffixDetailComponent);
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
