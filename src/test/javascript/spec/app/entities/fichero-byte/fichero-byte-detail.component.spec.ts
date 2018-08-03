/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteDetailComponent } from 'app/entities/fichero-byte/fichero-byte-detail.component';
import { FicheroByte } from 'app/shared/model/fichero-byte.model';

describe('Component Tests', () => {
    describe('FicheroByte Management Detail Component', () => {
        let comp: FicheroByteDetailComponent;
        let fixture: ComponentFixture<FicheroByteDetailComponent>;
        const route = ({ data: of({ ficheroByte: new FicheroByte(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheroByteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroByteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ficheroByte).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
