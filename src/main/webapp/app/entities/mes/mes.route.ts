import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mes } from 'app/shared/model/mes.model';
import { MesService } from './mes.service';
import { MesComponent } from './mes.component';
import { MesDetailComponent } from './mes-detail.component';
import { MesUpdateComponent } from './mes-update.component';
import { MesDeletePopupComponent } from './mes-delete-dialog.component';
import { IMes } from 'app/shared/model/mes.model';

@Injectable({ providedIn: 'root' })
export class MesResolve implements Resolve<IMes> {
    constructor(private service: MesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mes: HttpResponse<Mes>) => mes.body));
        }
        return of(new Mes());
    }
}

export const mesRoute: Routes = [
    {
        path: 'mes',
        component: MesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes/:id/view',
        component: MesDetailComponent,
        resolve: {
            mes: MesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes/new',
        component: MesUpdateComponent,
        resolve: {
            mes: MesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes/:id/edit',
        component: MesUpdateComponent,
        resolve: {
            mes: MesResolve
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
        path: 'mes/:id/delete',
        component: MesDeletePopupComponent,
        resolve: {
            mes: MesResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
