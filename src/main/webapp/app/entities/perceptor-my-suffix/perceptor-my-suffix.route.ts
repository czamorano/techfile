import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';
import { PerceptorMySuffixService } from './perceptor-my-suffix.service';
import { PerceptorMySuffixComponent } from './perceptor-my-suffix.component';
import { PerceptorMySuffixDetailComponent } from './perceptor-my-suffix-detail.component';
import { PerceptorMySuffixUpdateComponent } from './perceptor-my-suffix-update.component';
import { PerceptorMySuffixDeletePopupComponent } from './perceptor-my-suffix-delete-dialog.component';
import { IPerceptorMySuffix } from 'app/shared/model/perceptor-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PerceptorMySuffixResolve implements Resolve<IPerceptorMySuffix> {
    constructor(private service: PerceptorMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perceptor: HttpResponse<PerceptorMySuffix>) => perceptor.body));
        }
        return of(new PerceptorMySuffix());
    }
}

export const perceptorRoute: Routes = [
    {
        path: 'perceptor-my-suffix',
        component: PerceptorMySuffixComponent,
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
        path: 'perceptor-my-suffix/:id/view',
        component: PerceptorMySuffixDetailComponent,
        resolve: {
            perceptor: PerceptorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor-my-suffix/new',
        component: PerceptorMySuffixUpdateComponent,
        resolve: {
            perceptor: PerceptorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor-my-suffix/:id/edit',
        component: PerceptorMySuffixUpdateComponent,
        resolve: {
            perceptor: PerceptorMySuffixResolve
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
        path: 'perceptor-my-suffix/:id/delete',
        component: PerceptorMySuffixDeletePopupComponent,
        resolve: {
            perceptor: PerceptorMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
