/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { MesMySuffixComponent } from 'app/entities/mes-my-suffix/mes-my-suffix.component';
import { MesMySuffixService } from 'app/entities/mes-my-suffix/mes-my-suffix.service';
import { MesMySuffix } from 'app/shared/model/mes-my-suffix.model';

describe('Component Tests', () => {
    describe('MesMySuffix Management Component', () => {
        let comp: MesMySuffixComponent;
        let fixture: ComponentFixture<MesMySuffixComponent>;
        let service: MesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesMySuffixComponent],
                providers: []
            })
                .overrideTemplate(MesMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MesMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MesMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MesMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
