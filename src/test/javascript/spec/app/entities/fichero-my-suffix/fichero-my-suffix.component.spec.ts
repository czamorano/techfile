/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { FicheroMySuffixComponent } from 'app/entities/fichero-my-suffix/fichero-my-suffix.component';
import { FicheroMySuffixService } from 'app/entities/fichero-my-suffix/fichero-my-suffix.service';
import { FicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';

describe('Component Tests', () => {
    describe('FicheroMySuffix Management Component', () => {
        let comp: FicheroMySuffixComponent;
        let fixture: ComponentFixture<FicheroMySuffixComponent>;
        let service: FicheroMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroMySuffixComponent],
                providers: []
            })
                .overrideTemplate(FicheroMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheroMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ficheroes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
