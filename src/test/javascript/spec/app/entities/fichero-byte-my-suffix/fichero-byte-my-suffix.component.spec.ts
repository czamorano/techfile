/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteMySuffixComponent } from 'app/entities/fichero-byte-my-suffix/fichero-byte-my-suffix.component';
import { FicheroByteMySuffixService } from 'app/entities/fichero-byte-my-suffix/fichero-byte-my-suffix.service';
import { FicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';

describe('Component Tests', () => {
    describe('FicheroByteMySuffix Management Component', () => {
        let comp: FicheroByteMySuffixComponent;
        let fixture: ComponentFixture<FicheroByteMySuffixComponent>;
        let service: FicheroByteMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteMySuffixComponent],
                providers: []
            })
                .overrideTemplate(FicheroByteMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroByteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroByteMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheroByteMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ficheroBytes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
