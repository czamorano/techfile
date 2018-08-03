import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FicheroByte } from 'app/shared/model/fichero-byte.model';
import { FicheroByteService } from './fichero-byte.service';
import { FicheroByteComponent } from './fichero-byte.component';
import { FicheroByteDetailComponent } from './fichero-byte-detail.component';
import { FicheroByteUpdateComponent } from './fichero-byte-update.component';
import { FicheroByteDeletePopupComponent } from './fichero-byte-delete-dialog.component';
import { IFicheroByte } from 'app/shared/model/fichero-byte.model';

@Injectable({ providedIn: 'root' })
export class FicheroByteResolve implements Resolve<IFicheroByte> {
    constructor(private service: FicheroByteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ficheroByte: HttpResponse<FicheroByte>) => ficheroByte.body));
        }
        return of(new FicheroByte());
    }
}

export const ficheroByteRoute: Routes = [
    {
        path: 'fichero-byte',
        component: FicheroByteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte/:id/view',
        component: FicheroByteDetailComponent,
        resolve: {
            ficheroByte: FicheroByteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte/new',
        component: FicheroByteUpdateComponent,
        resolve: {
            ficheroByte: FicheroByteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte/:id/edit',
        component: FicheroByteUpdateComponent,
        resolve: {
            ficheroByte: FicheroByteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheroBytePopupRoute: Routes = [
    {
        path: 'fichero-byte/:id/delete',
        component: FicheroByteDeletePopupComponent,
        resolve: {
            ficheroByte: FicheroByteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
