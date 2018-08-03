import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pensionista } from 'app/shared/model/pensionista.model';
import { PensionistaService } from './pensionista.service';
import { PensionistaComponent } from './pensionista.component';
import { PensionistaDetailComponent } from './pensionista-detail.component';
import { PensionistaUpdateComponent } from './pensionista-update.component';
import { PensionistaDeletePopupComponent } from './pensionista-delete-dialog.component';
import { IPensionista } from 'app/shared/model/pensionista.model';

@Injectable({ providedIn: 'root' })
export class PensionistaResolve implements Resolve<IPensionista> {
    constructor(private service: PensionistaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pensionista: HttpResponse<Pensionista>) => pensionista.body));
        }
        return of(new Pensionista());
    }
}

export const pensionistaRoute: Routes = [
    {
        path: 'pensionista',
        component: PensionistaComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista/:id/view',
        component: PensionistaDetailComponent,
        resolve: {
            pensionista: PensionistaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista/new',
        component: PensionistaUpdateComponent,
        resolve: {
            pensionista: PensionistaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista/:id/edit',
        component: PensionistaUpdateComponent,
        resolve: {
            pensionista: PensionistaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pensionistaPopupRoute: Routes = [
    {
        path: 'pensionista/:id/delete',
        component: PensionistaDeletePopupComponent,
        resolve: {
            pensionista: PensionistaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
