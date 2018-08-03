import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';
import { ProvinciaMySuffixService } from './provincia-my-suffix.service';
import { ProvinciaMySuffixComponent } from './provincia-my-suffix.component';
import { ProvinciaMySuffixDetailComponent } from './provincia-my-suffix-detail.component';
import { ProvinciaMySuffixUpdateComponent } from './provincia-my-suffix-update.component';
import { ProvinciaMySuffixDeletePopupComponent } from './provincia-my-suffix-delete-dialog.component';
import { IProvinciaMySuffix } from 'app/shared/model/provincia-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ProvinciaMySuffixResolve implements Resolve<IProvinciaMySuffix> {
    constructor(private service: ProvinciaMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((provincia: HttpResponse<ProvinciaMySuffix>) => provincia.body));
        }
        return of(new ProvinciaMySuffix());
    }
}

export const provinciaRoute: Routes = [
    {
        path: 'provincia-my-suffix',
        component: ProvinciaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincia-my-suffix/:id/view',
        component: ProvinciaMySuffixDetailComponent,
        resolve: {
            provincia: ProvinciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincia-my-suffix/new',
        component: ProvinciaMySuffixUpdateComponent,
        resolve: {
            provincia: ProvinciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincia-my-suffix/:id/edit',
        component: ProvinciaMySuffixUpdateComponent,
        resolve: {
            provincia: ProvinciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const provinciaPopupRoute: Routes = [
    {
        path: 'provincia-my-suffix/:id/delete',
        component: ProvinciaMySuffixDeletePopupComponent,
        resolve: {
            provincia: ProvinciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
