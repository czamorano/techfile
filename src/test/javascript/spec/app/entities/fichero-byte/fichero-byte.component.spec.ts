/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteComponent } from 'app/entities/fichero-byte/fichero-byte.component';
import { FicheroByteService } from 'app/entities/fichero-byte/fichero-byte.service';
import { FicheroByte } from 'app/shared/model/fichero-byte.model';

describe('Component Tests', () => {
    describe('FicheroByte Management Component', () => {
        let comp: FicheroByteComponent;
        let fixture: ComponentFixture<FicheroByteComponent>;
        let service: FicheroByteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteComponent],
                providers: []
            })
                .overrideTemplate(FicheroByteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroByteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroByteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FicheroByte(123)],
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
