import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';
import { PensionConcurrenteMySuffixService } from './pension-concurrente-my-suffix.service';
import { PensionConcurrenteMySuffixComponent } from './pension-concurrente-my-suffix.component';
import { PensionConcurrenteMySuffixDetailComponent } from './pension-concurrente-my-suffix-detail.component';
import { PensionConcurrenteMySuffixUpdateComponent } from './pension-concurrente-my-suffix-update.component';
import { PensionConcurrenteMySuffixDeletePopupComponent } from './pension-concurrente-my-suffix-delete-dialog.component';
import { IPensionConcurrenteMySuffix } from 'app/shared/model/pension-concurrente-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PensionConcurrenteMySuffixResolve implements Resolve<IPensionConcurrenteMySuffix> {
    constructor(private service: PensionConcurrenteMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((pensionConcurrente: HttpResponse<PensionConcurrenteMySuffix>) => pensionConcurrente.body));
        }
        return of(new PensionConcurrenteMySuffix());
    }
}

export const pensionConcurrenteRoute: Routes = [
    {
        path: 'pension-concurrente-my-suffix',
        component: PensionConcurrenteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente-my-suffix/:id/view',
        component: PensionConcurrenteMySuffixDetailComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente-my-suffix/new',
        component: PensionConcurrenteMySuffixUpdateComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente-my-suffix/:id/edit',
        component: PensionConcurrenteMySuffixUpdateComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteMySuffixResolve
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
        path: 'pension-concurrente-my-suffix/:id/delete',
        component: PensionConcurrenteMySuffixDeletePopupComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
