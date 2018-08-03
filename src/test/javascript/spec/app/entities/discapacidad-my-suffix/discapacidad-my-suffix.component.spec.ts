/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadMySuffixComponent } from 'app/entities/discapacidad-my-suffix/discapacidad-my-suffix.component';
import { DiscapacidadMySuffixService } from 'app/entities/discapacidad-my-suffix/discapacidad-my-suffix.service';
import { DiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';

describe('Component Tests', () => {
    describe('DiscapacidadMySuffix Management Component', () => {
        let comp: DiscapacidadMySuffixComponent;
        let fixture: ComponentFixture<DiscapacidadMySuffixComponent>;
        let service: DiscapacidadMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadMySuffixComponent],
                providers: []
            })
                .overrideTemplate(DiscapacidadMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiscapacidadMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapacidadMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DiscapacidadMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.discapacidads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
