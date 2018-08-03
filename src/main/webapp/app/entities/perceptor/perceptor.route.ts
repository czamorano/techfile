import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Perceptor } from 'app/shared/model/perceptor.model';
import { PerceptorService } from './perceptor.service';
import { PerceptorComponent } from './perceptor.component';
import { PerceptorDetailComponent } from './perceptor-detail.component';
import { PerceptorUpdateComponent } from './perceptor-update.component';
import { PerceptorDeletePopupComponent } from './perceptor-delete-dialog.component';
import { IPerceptor } from 'app/shared/model/perceptor.model';

@Injectable({ providedIn: 'root' })
export class PerceptorResolve implements Resolve<IPerceptor> {
    constructor(private service: PerceptorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perceptor: HttpResponse<Perceptor>) => perceptor.body));
        }
        return of(new Perceptor());
    }
}

export const perceptorRoute: Routes = [
    {
        path: 'perceptor',
        component: PerceptorComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor/:id/view',
        component: PerceptorDetailComponent,
        resolve: {
            perceptor: PerceptorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor/new',
        component: PerceptorUpdateComponent,
        resolve: {
            perceptor: PerceptorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor/:id/edit',
        component: PerceptorUpdateComponent,
        resolve: {
            perceptor: PerceptorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perceptorPopupRoute: Routes = [
    {
        path: 'perceptor/:id/delete',
        component: PerceptorDeletePopupComponent,
        resolve: {
            perceptor: PerceptorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
