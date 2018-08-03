import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';
import { ConvivienteMySuffixService } from './conviviente-my-suffix.service';
import { ConvivienteMySuffixComponent } from './conviviente-my-suffix.component';
import { ConvivienteMySuffixDetailComponent } from './conviviente-my-suffix-detail.component';
import { ConvivienteMySuffixUpdateComponent } from './conviviente-my-suffix-update.component';
import { ConvivienteMySuffixDeletePopupComponent } from './conviviente-my-suffix-delete-dialog.component';
import { IConvivienteMySuffix } from 'app/shared/model/conviviente-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ConvivienteMySuffixResolve implements Resolve<IConvivienteMySuffix> {
    constructor(private service: ConvivienteMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((conviviente: HttpResponse<ConvivienteMySuffix>) => conviviente.body));
        }
        return of(new ConvivienteMySuffix());
    }
}

export const convivienteRoute: Routes = [
    {
        path: 'conviviente-my-suffix',
        component: ConvivienteMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente-my-suffix/:id/view',
        component: ConvivienteMySuffixDetailComponent,
        resolve: {
            conviviente: ConvivienteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente-my-suffix/new',
        component: ConvivienteMySuffixUpdateComponent,
        resolve: {
            conviviente: ConvivienteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente-my-suffix/:id/edit',
        component: ConvivienteMySuffixUpdateComponent,
        resolve: {
            conviviente: ConvivienteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const convivientePopupRoute: Routes = [
    {
        path: 'conviviente-my-suffix/:id/delete',
        component: ConvivienteMySuffixDeletePopupComponent,
        resolve: {
            conviviente: ConvivienteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
