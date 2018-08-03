/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PersonaMySuffixDetailComponent } from 'app/entities/persona-my-suffix/persona-my-suffix-detail.component';
import { PersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';

describe('Component Tests', () => {
    describe('PersonaMySuffix Management Detail Component', () => {
        let comp: PersonaMySuffixDetailComponent;
        let fixture: ComponentFixture<PersonaMySuffixDetailComponent>;
        const route = ({ data: of({ persona: new PersonaMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PersonaMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PersonaMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonaMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.persona).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
