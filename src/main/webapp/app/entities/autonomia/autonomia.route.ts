import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Autonomia } from 'app/shared/model/autonomia.model';
import { AutonomiaService } from './autonomia.service';
import { AutonomiaComponent } from './autonomia.component';
import { AutonomiaDetailComponent } from './autonomia-detail.component';
import { AutonomiaUpdateComponent } from './autonomia-update.component';
import { AutonomiaDeletePopupComponent } from './autonomia-delete-dialog.component';
import { IAutonomia } from 'app/shared/model/autonomia.model';

@Injectable({ providedIn: 'root' })
export class AutonomiaResolve implements Resolve<IAutonomia> {
    constructor(private service: AutonomiaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((autonomia: HttpResponse<Autonomia>) => autonomia.body));
        }
        return of(new Autonomia());
    }
}

export const autonomiaRoute: Routes = [
    {
        path: 'autonomia',
        component: AutonomiaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'autonomia/:id/view',
        component: AutonomiaDetailComponent,
        resolve: {
            autonomia: AutonomiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'autonomia/new',
        component: AutonomiaUpdateComponent,
        resolve: {
            autonomia: AutonomiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'autonomia/:id/edit',
        component: AutonomiaUpdateComponent,
        resolve: {
            autonomia: AutonomiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autonomiaPopupRoute: Routes = [
    {
        path: 'autonomia/:id/delete',
        component: AutonomiaDeletePopupComponent,
        resolve: {
            autonomia: AutonomiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
