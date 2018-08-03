import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';
import { RegimenProcedenciaMySuffixService } from './regimen-procedencia-my-suffix.service';
import { RegimenProcedenciaMySuffixComponent } from './regimen-procedencia-my-suffix.component';
import { RegimenProcedenciaMySuffixDetailComponent } from './regimen-procedencia-my-suffix-detail.component';
import { RegimenProcedenciaMySuffixUpdateComponent } from './regimen-procedencia-my-suffix-update.component';
import { RegimenProcedenciaMySuffixDeletePopupComponent } from './regimen-procedencia-my-suffix-delete-dialog.component';
import { IRegimenProcedenciaMySuffix } from 'app/shared/model/regimen-procedencia-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class RegimenProcedenciaMySuffixResolve implements Resolve<IRegimenProcedenciaMySuffix> {
    constructor(private service: RegimenProcedenciaMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((regimenProcedencia: HttpResponse<RegimenProcedenciaMySuffix>) => regimenProcedencia.body));
        }
        return of(new RegimenProcedenciaMySuffix());
    }
}

export const regimenProcedenciaRoute: Routes = [
    {
        path: 'regimen-procedencia-my-suffix',
        component: RegimenProcedenciaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia-my-suffix/:id/view',
        component: RegimenProcedenciaMySuffixDetailComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia-my-suffix/new',
        component: RegimenProcedenciaMySuffixUpdateComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia-my-suffix/:id/edit',
        component: RegimenProcedenciaMySuffixUpdateComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regimenProcedenciaPopupRoute: Routes = [
    {
        path: 'regimen-procedencia-my-suffix/:id/delete',
        component: RegimenProcedenciaMySuffixDeletePopupComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
