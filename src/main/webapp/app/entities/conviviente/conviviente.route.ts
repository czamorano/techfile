import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conviviente } from 'app/shared/model/conviviente.model';
import { ConvivienteService } from './conviviente.service';
import { ConvivienteComponent } from './conviviente.component';
import { ConvivienteDetailComponent } from './conviviente-detail.component';
import { ConvivienteUpdateComponent } from './conviviente-update.component';
import { ConvivienteDeletePopupComponent } from './conviviente-delete-dialog.component';
import { IConviviente } from 'app/shared/model/conviviente.model';

@Injectable({ providedIn: 'root' })
export class ConvivienteResolve implements Resolve<IConviviente> {
    constructor(private service: ConvivienteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((conviviente: HttpResponse<Conviviente>) => conviviente.body));
        }
        return of(new Conviviente());
    }
}

export const convivienteRoute: Routes = [
    {
        path: 'conviviente',
        component: ConvivienteComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente/:id/view',
        component: ConvivienteDetailComponent,
        resolve: {
            conviviente: ConvivienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente/new',
        component: ConvivienteUpdateComponent,
        resolve: {
            conviviente: ConvivienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente/:id/edit',
        component: ConvivienteUpdateComponent,
        resolve: {
            conviviente: ConvivienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const convivientePopupRoute: Routes = [
    {
        path: 'conviviente/:id/delete',
        component: ConvivienteDeletePopupComponent,
        resolve: {
            conviviente: ConvivienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
