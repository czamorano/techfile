import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';
import { EtiologiaMySuffixService } from './etiologia-my-suffix.service';
import { EtiologiaMySuffixComponent } from './etiologia-my-suffix.component';
import { EtiologiaMySuffixDetailComponent } from './etiologia-my-suffix-detail.component';
import { EtiologiaMySuffixUpdateComponent } from './etiologia-my-suffix-update.component';
import { EtiologiaMySuffixDeletePopupComponent } from './etiologia-my-suffix-delete-dialog.component';
import { IEtiologiaMySuffix } from 'app/shared/model/etiologia-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class EtiologiaMySuffixResolve implements Resolve<IEtiologiaMySuffix> {
    constructor(private service: EtiologiaMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((etiologia: HttpResponse<EtiologiaMySuffix>) => etiologia.body));
        }
        return of(new EtiologiaMySuffix());
    }
}

export const etiologiaRoute: Routes = [
    {
        path: 'etiologia-my-suffix',
        component: EtiologiaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia-my-suffix/:id/view',
        component: EtiologiaMySuffixDetailComponent,
        resolve: {
            etiologia: EtiologiaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia-my-suffix/new',
        component: EtiologiaMySuffixUpdateComponent,
        resolve: {
            etiologia: EtiologiaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia-my-suffix/:id/edit',
        component: EtiologiaMySuffixUpdateComponent,
        resolve: {
            etiologia: EtiologiaMySuffixResolve
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
        path: 'etiologia-my-suffix/:id/delete',
        component: EtiologiaMySuffixDeletePopupComponent,
        resolve: {
            etiologia: EtiologiaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
