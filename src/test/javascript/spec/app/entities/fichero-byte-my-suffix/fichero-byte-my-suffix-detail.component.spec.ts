/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteMySuffixDetailComponent } from 'app/entities/fichero-byte-my-suffix/fichero-byte-my-suffix-detail.component';
import { FicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';

describe('Component Tests', () => {
    describe('FicheroByteMySuffix Management Detail Component', () => {
        let comp: FicheroByteMySuffixDetailComponent;
        let fixture: ComponentFixture<FicheroByteMySuffixDetailComponent>;
        const route = ({ data: of({ ficheroByte: new FicheroByteMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheroByteMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroByteMySuffixDetailComponent);
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
