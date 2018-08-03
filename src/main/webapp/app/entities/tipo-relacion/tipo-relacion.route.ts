import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoRelacion } from 'app/shared/model/tipo-relacion.model';
import { TipoRelacionService } from './tipo-relacion.service';
import { TipoRelacionComponent } from './tipo-relacion.component';
import { TipoRelacionDetailComponent } from './tipo-relacion-detail.component';
import { TipoRelacionUpdateComponent } from './tipo-relacion-update.component';
import { TipoRelacionDeletePopupComponent } from './tipo-relacion-delete-dialog.component';
import { ITipoRelacion } from 'app/shared/model/tipo-relacion.model';

@Injectable({ providedIn: 'root' })
export class TipoRelacionResolve implements Resolve<ITipoRelacion> {
    constructor(private service: TipoRelacionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoRelacion: HttpResponse<TipoRelacion>) => tipoRelacion.body));
        }
        return of(new TipoRelacion());
    }
}

export const tipoRelacionRoute: Routes = [
    {
        path: 'tipo-relacion',
        component: TipoRelacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion/:id/view',
        component: TipoRelacionDetailComponent,
        resolve: {
            tipoRelacion: TipoRelacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion/new',
        component: TipoRelacionUpdateComponent,
        resolve: {
            tipoRelacion: TipoRelacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion/:id/edit',
        component: TipoRelacionUpdateComponent,
        resolve: {
            tipoRelacion: TipoRelacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoRelacionPopupRoute: Routes = [
    {
        path: 'tipo-relacion/:id/delete',
        component: TipoRelacionDeletePopupComponent,
        resolve: {
            tipoRelacion: TipoRelacionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
