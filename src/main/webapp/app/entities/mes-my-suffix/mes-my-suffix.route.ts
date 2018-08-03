import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MesMySuffix } from 'app/shared/model/mes-my-suffix.model';
import { MesMySuffixService } from './mes-my-suffix.service';
import { MesMySuffixComponent } from './mes-my-suffix.component';
import { MesMySuffixDetailComponent } from './mes-my-suffix-detail.component';
import { MesMySuffixUpdateComponent } from './mes-my-suffix-update.component';
import { MesMySuffixDeletePopupComponent } from './mes-my-suffix-delete-dialog.component';
import { IMesMySuffix } from 'app/shared/model/mes-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MesMySuffixResolve implements Resolve<IMesMySuffix> {
    constructor(private service: MesMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mes: HttpResponse<MesMySuffix>) => mes.body));
        }
        return of(new MesMySuffix());
    }
}

export const mesRoute: Routes = [
    {
        path: 'mes-my-suffix',
        component: MesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes-my-suffix/:id/view',
        component: MesMySuffixDetailComponent,
        resolve: {
            mes: MesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes-my-suffix/new',
        component: MesMySuffixUpdateComponent,
        resolve: {
            mes: MesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes-my-suffix/:id/edit',
        component: MesMySuffixUpdateComponent,
        resolve: {
            mes: MesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mesPopupRoute: Routes = [
    {
        path: 'mes-my-suffix/:id/delete',
        component: MesMySuffixDeletePopupComponent,
        resolve: {
            mes: MesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
