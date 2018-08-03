import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';
import { DiscapacidadMySuffixService } from './discapacidad-my-suffix.service';
import { DiscapacidadMySuffixComponent } from './discapacidad-my-suffix.component';
import { DiscapacidadMySuffixDetailComponent } from './discapacidad-my-suffix-detail.component';
import { DiscapacidadMySuffixUpdateComponent } from './discapacidad-my-suffix-update.component';
import { DiscapacidadMySuffixDeletePopupComponent } from './discapacidad-my-suffix-delete-dialog.component';
import { IDiscapacidadMySuffix } from 'app/shared/model/discapacidad-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DiscapacidadMySuffixResolve implements Resolve<IDiscapacidadMySuffix> {
    constructor(private service: DiscapacidadMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((discapacidad: HttpResponse<DiscapacidadMySuffix>) => discapacidad.body));
        }
        return of(new DiscapacidadMySuffix());
    }
}

export const discapacidadRoute: Routes = [
    {
        path: 'discapacidad-my-suffix',
        component: DiscapacidadMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad-my-suffix/:id/view',
        component: DiscapacidadMySuffixDetailComponent,
        resolve: {
            discapacidad: DiscapacidadMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad-my-suffix/new',
        component: DiscapacidadMySuffixUpdateComponent,
        resolve: {
            discapacidad: DiscapacidadMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad-my-suffix/:id/edit',
        component: DiscapacidadMySuffixUpdateComponent,
        resolve: {
            discapacidad: DiscapacidadMySuffixResolve
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
        path: 'discapacidad-my-suffix/:id/delete',
        component: DiscapacidadMySuffixDeletePopupComponent,
        resolve: {
            discapacidad: DiscapacidadMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
