import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Discapacidad } from 'app/shared/model/discapacidad.model';
import { DiscapacidadService } from './discapacidad.service';
import { DiscapacidadComponent } from './discapacidad.component';
import { DiscapacidadDetailComponent } from './discapacidad-detail.component';
import { DiscapacidadUpdateComponent } from './discapacidad-update.component';
import { DiscapacidadDeletePopupComponent } from './discapacidad-delete-dialog.component';
import { IDiscapacidad } from 'app/shared/model/discapacidad.model';

@Injectable({ providedIn: 'root' })
export class DiscapacidadResolve implements Resolve<IDiscapacidad> {
    constructor(private service: DiscapacidadService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((discapacidad: HttpResponse<Discapacidad>) => discapacidad.body));
        }
        return of(new Discapacidad());
    }
}

export const discapacidadRoute: Routes = [
    {
        path: 'discapacidad',
        component: DiscapacidadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad/:id/view',
        component: DiscapacidadDetailComponent,
        resolve: {
            discapacidad: DiscapacidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad/new',
        component: DiscapacidadUpdateComponent,
        resolve: {
            discapacidad: DiscapacidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad/:id/edit',
        component: DiscapacidadUpdateComponent,
        resolve: {
            discapacidad: DiscapacidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discapacidadPopupRoute: Routes = [
    {
        path: 'discapacidad/:id/delete',
        component: DiscapacidadDeletePopupComponent,
        resolve: {
            discapacidad: DiscapacidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
