/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteComponent } from 'app/entities/pension-concurrente/pension-concurrente.component';
import { PensionConcurrenteService } from 'app/entities/pension-concurrente/pension-concurrente.service';
import { PensionConcurrente } from 'app/shared/model/pension-concurrente.model';

describe('Component Tests', () => {
    describe('PensionConcurrente Management Component', () => {
        let comp: PensionConcurrenteComponent;
        let fixture: ComponentFixture<PensionConcurrenteComponent>;
        let service: PensionConcurrenteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteComponent],
                providers: []
            })
                .overrideTemplate(PensionConcurrenteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PensionConcurrenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionConcurrenteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PensionConcurrente(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pensionConcurrentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
