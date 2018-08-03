/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroMySuffixDetailComponent } from 'app/entities/fichero-my-suffix/fichero-my-suffix-detail.component';
import { FicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';

describe('Component Tests', () => {
    describe('FicheroMySuffix Management Detail Component', () => {
        let comp: FicheroMySuffixDetailComponent;
        let fixture: ComponentFixture<FicheroMySuffixDetailComponent>;
        const route = ({ data: of({ fichero: new FicheroMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheroMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fichero).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
