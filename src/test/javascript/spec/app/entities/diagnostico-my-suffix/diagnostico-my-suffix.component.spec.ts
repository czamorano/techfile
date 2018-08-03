/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { DiagnosticoMySuffixComponent } from 'app/entities/diagnostico-my-suffix/diagnostico-my-suffix.component';
import { DiagnosticoMySuffixService } from 'app/entities/diagnostico-my-suffix/diagnostico-my-suffix.service';
import { DiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';

describe('Component Tests', () => {
    describe('DiagnosticoMySuffix Management Component', () => {
        let comp: DiagnosticoMySuffixComponent;
        let fixture: ComponentFixture<DiagnosticoMySuffixComponent>;
        let service: DiagnosticoMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiagnosticoMySuffixComponent],
                providers: []
            })
                .overrideTemplate(DiagnosticoMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiagnosticoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosticoMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DiagnosticoMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.diagnosticos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
