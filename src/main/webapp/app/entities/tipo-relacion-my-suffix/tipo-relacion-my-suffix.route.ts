import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';
import { TipoRelacionMySuffixService } from './tipo-relacion-my-suffix.service';
import { TipoRelacionMySuffixComponent } from './tipo-relacion-my-suffix.component';
import { TipoRelacionMySuffixDetailComponent } from './tipo-relacion-my-suffix-detail.component';
import { TipoRelacionMySuffixUpdateComponent } from './tipo-relacion-my-suffix-update.component';
import { TipoRelacionMySuffixDeletePopupComponent } from './tipo-relacion-my-suffix-delete-dialog.component';
import { ITipoRelacionMySuffix } from 'app/shared/model/tipo-relacion-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TipoRelacionMySuffixResolve implements Resolve<ITipoRelacionMySuffix> {
    constructor(private service: TipoRelacionMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoRelacion: HttpResponse<TipoRelacionMySuffix>) => tipoRelacion.body));
        }
        return of(new TipoRelacionMySuffix());
    }
}

export const tipoRelacionRoute: Routes = [
    {
        path: 'tipo-relacion-my-suffix',
        component: TipoRelacionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion-my-suffix/:id/view',
        component: TipoRelacionMySuffixDetailComponent,
        resolve: {
            tipoRelacion: TipoRelacionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion-my-suffix/new',
        component: TipoRelacionMySuffixUpdateComponent,
        resolve: {
            tipoRelacion: TipoRelacionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion-my-suffix/:id/edit',
        component: TipoRelacionMySuffixUpdateComponent,
        resolve: {
            tipoRelacion: TipoRelacionMySuffixResolve
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
        path: 'tipo-relacion-my-suffix/:id/delete',
        component: TipoRelacionMySuffixDeletePopupComponent,
        resolve: {
            tipoRelacion: TipoRelacionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
