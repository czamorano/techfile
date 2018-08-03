import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fichero } from 'app/shared/model/fichero.model';
import { FicheroService } from './fichero.service';
import { FicheroComponent } from './fichero.component';
import { FicheroDetailComponent } from './fichero-detail.component';
import { FicheroUpdateComponent } from './fichero-update.component';
import { FicheroDeletePopupComponent } from './fichero-delete-dialog.component';
import { IFichero } from 'app/shared/model/fichero.model';

@Injectable({ providedIn: 'root' })
export class FicheroResolve implements Resolve<IFichero> {
    constructor(private service: FicheroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fichero: HttpResponse<Fichero>) => fichero.body));
        }
        return of(new Fichero());
    }
}

export const ficheroRoute: Routes = [
    {
        path: 'fichero',
        component: FicheroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero/:id/view',
        component: FicheroDetailComponent,
        resolve: {
            fichero: FicheroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero/new',
        component: FicheroUpdateComponent,
        resolve: {
            fichero: FicheroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero/:id/edit',
        component: FicheroUpdateComponent,
        resolve: {
            fichero: FicheroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheroPopupRoute: Routes = [
    {
        path: 'fichero/:id/delete',
        component: FicheroDeletePopupComponent,
        resolve: {
            fichero: FicheroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
