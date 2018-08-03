/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaMySuffixComponent } from 'app/entities/regimen-procedencia-my-suffix/regimen-procedencia-my-suffix.component';
import { RegimenProcedenciaMySuffixService } from 'app/entities/regimen-procedencia-my-suffix/regimen-procedencia-my-suffix.service';
import { RegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';

describe('Component Tests', () => {
    describe('RegimenProcedenciaMySuffix Management Component', () => {
        let comp: RegimenProcedenciaMySuffixComponent;
        let fixture: ComponentFixture<RegimenProcedenciaMySuffixComponent>;
        let service: RegimenProcedenciaMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaMySuffixComponent],
                providers: []
            })
                .overrideTemplate(RegimenProcedenciaMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegimenProcedenciaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenProcedenciaMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RegimenProcedenciaMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.regimenProcedencias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
