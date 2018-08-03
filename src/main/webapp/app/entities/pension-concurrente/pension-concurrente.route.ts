import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PensionConcurrente } from 'app/shared/model/pension-concurrente.model';
import { PensionConcurrenteService } from './pension-concurrente.service';
import { PensionConcurrenteComponent } from './pension-concurrente.component';
import { PensionConcurrenteDetailComponent } from './pension-concurrente-detail.component';
import { PensionConcurrenteUpdateComponent } from './pension-concurrente-update.component';
import { PensionConcurrenteDeletePopupComponent } from './pension-concurrente-delete-dialog.component';
import { IPensionConcurrente } from 'app/shared/model/pension-concurrente.model';

@Injectable({ providedIn: 'root' })
export class PensionConcurrenteResolve implements Resolve<IPensionConcurrente> {
    constructor(private service: PensionConcurrenteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pensionConcurrente: HttpResponse<PensionConcurrente>) => pensionConcurrente.body));
        }
        return of(new PensionConcurrente());
    }
}

export const pensionConcurrenteRoute: Routes = [
    {
        path: 'pension-concurrente',
        component: PensionConcurrenteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente/:id/view',
        component: PensionConcurrenteDetailComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente/new',
        component: PensionConcurrenteUpdateComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente/:id/edit',
        component: PensionConcurrenteUpdateComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pensionConcurrentePopupRoute: Routes = [
    {
        path: 'pension-concurrente/:id/delete',
        component: PensionConcurrenteDeletePopupComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
