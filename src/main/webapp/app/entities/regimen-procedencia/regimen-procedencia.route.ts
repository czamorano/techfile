import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';
import { RegimenProcedenciaService } from './regimen-procedencia.service';
import { RegimenProcedenciaComponent } from './regimen-procedencia.component';
import { RegimenProcedenciaDetailComponent } from './regimen-procedencia-detail.component';
import { RegimenProcedenciaUpdateComponent } from './regimen-procedencia-update.component';
import { RegimenProcedenciaDeletePopupComponent } from './regimen-procedencia-delete-dialog.component';
import { IRegimenProcedencia } from 'app/shared/model/regimen-procedencia.model';

@Injectable({ providedIn: 'root' })
export class RegimenProcedenciaResolve implements Resolve<IRegimenProcedencia> {
    constructor(private service: RegimenProcedenciaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((regimenProcedencia: HttpResponse<RegimenProcedencia>) => regimenProcedencia.body));
        }
        return of(new RegimenProcedencia());
    }
}

export const regimenProcedenciaRoute: Routes = [
    {
        path: 'regimen-procedencia',
        component: RegimenProcedenciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia/:id/view',
        component: RegimenProcedenciaDetailComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia/new',
        component: RegimenProcedenciaUpdateComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia/:id/edit',
        component: RegimenProcedenciaUpdateComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaResolve
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
        path: 'regimen-procedencia/:id/delete',
        component: RegimenProcedenciaDeletePopupComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
