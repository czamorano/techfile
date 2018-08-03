/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { UsuarioMySuffixComponent } from 'app/entities/usuario-my-suffix/usuario-my-suffix.component';
import { UsuarioMySuffixService } from 'app/entities/usuario-my-suffix/usuario-my-suffix.service';
import { UsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';

describe('Component Tests', () => {
    describe('UsuarioMySuffix Management Component', () => {
        let comp: UsuarioMySuffixComponent;
        let fixture: ComponentFixture<UsuarioMySuffixComponent>;
        let service: UsuarioMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [UsuarioMySuffixComponent],
                providers: []
            })
                .overrideTemplate(UsuarioMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsuarioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UsuarioMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.usuarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
