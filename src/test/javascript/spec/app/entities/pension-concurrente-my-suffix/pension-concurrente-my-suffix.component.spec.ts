/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteMySuffixComponent } from 'app/entities/pension-concurrente-my-suffix/pension-concurrente-my-suffix.component';
import { PensionConcurrenteMySuffixService } from 'app/entities/pension-concurrente-my-suffix/pension-concurrente-my-suffix.service';
import { PensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';

describe('Component Tests', () => {
    describe('PensionConcurrenteMySuffix Management Component', () => {
        let comp: PensionConcurrenteMySuffixComponent;
        let fixture: ComponentFixture<PensionConcurrenteMySuffixComponent>;
        let service: PensionConcurrenteMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PensionConcurrenteMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PensionConcurrenteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionConcurrenteMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PensionConcurrenteMySuffix(123)],
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
