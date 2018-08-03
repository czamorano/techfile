/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { UsuarioMySuffixDetailComponent } from 'app/entities/usuario-my-suffix/usuario-my-suffix-detail.component';
import { UsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';

describe('Component Tests', () => {
    describe('UsuarioMySuffix Management Detail Component', () => {
        let comp: UsuarioMySuffixDetailComponent;
        let fixture: ComponentFixture<UsuarioMySuffixDetailComponent>;
        const route = ({ data: of({ usuario: new UsuarioMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [UsuarioMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UsuarioMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsuarioMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.usuario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
