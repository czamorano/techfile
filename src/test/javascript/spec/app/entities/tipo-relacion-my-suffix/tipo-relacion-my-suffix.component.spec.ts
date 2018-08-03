/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionMySuffixComponent } from 'app/entities/tipo-relacion-my-suffix/tipo-relacion-my-suffix.component';
import { TipoRelacionMySuffixService } from 'app/entities/tipo-relacion-my-suffix/tipo-relacion-my-suffix.service';
import { TipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';

describe('Component Tests', () => {
    describe('TipoRelacionMySuffix Management Component', () => {
        let comp: TipoRelacionMySuffixComponent;
        let fixture: ComponentFixture<TipoRelacionMySuffixComponent>;
        let service: TipoRelacionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TipoRelacionMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoRelacionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TipoRelacionMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tipoRelacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
