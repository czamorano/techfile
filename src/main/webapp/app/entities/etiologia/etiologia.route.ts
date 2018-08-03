import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etiologia } from 'app/shared/model/etiologia.model';
import { EtiologiaService } from './etiologia.service';
import { EtiologiaComponent } from './etiologia.component';
import { EtiologiaDetailComponent } from './etiologia-detail.component';
import { EtiologiaUpdateComponent } from './etiologia-update.component';
import { EtiologiaDeletePopupComponent } from './etiologia-delete-dialog.component';
import { IEtiologia } from 'app/shared/model/etiologia.model';

@Injectable({ providedIn: 'root' })
export class EtiologiaResolve implements Resolve<IEtiologia> {
    constructor(private service: EtiologiaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((etiologia: HttpResponse<Etiologia>) => etiologia.body));
        }
        return of(new Etiologia());
    }
}

export const etiologiaRoute: Routes = [
    {
        path: 'etiologia',
        component: EtiologiaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia/:id/view',
        component: EtiologiaDetailComponent,
        resolve: {
            etiologia: EtiologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia/new',
        component: EtiologiaUpdateComponent,
        resolve: {
            etiologia: EtiologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia/:id/edit',
        component: EtiologiaUpdateComponent,
        resolve: {
            etiologia: EtiologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etiologiaPopupRoute: Routes = [
    {
        path: 'etiologia/:id/delete',
        component: EtiologiaDeletePopupComponent,
        resolve: {
            etiologia: EtiologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
