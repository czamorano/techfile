import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';
import { PensionistaMySuffixService } from './pensionista-my-suffix.service';
import { PensionistaMySuffixComponent } from './pensionista-my-suffix.component';
import { PensionistaMySuffixDetailComponent } from './pensionista-my-suffix-detail.component';
import { PensionistaMySuffixUpdateComponent } from './pensionista-my-suffix-update.component';
import { PensionistaMySuffixDeletePopupComponent } from './pensionista-my-suffix-delete-dialog.component';
import { IPensionistaMySuffix } from 'app/shared/model/pensionista-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PensionistaMySuffixResolve implements Resolve<IPensionistaMySuffix> {
    constructor(private service: PensionistaMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pensionista: HttpResponse<PensionistaMySuffix>) => pensionista.body));
        }
        return of(new PensionistaMySuffix());
    }
}

export const pensionistaRoute: Routes = [
    {
        path: 'pensionista-my-suffix',
        component: PensionistaMySuffixComponent,
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
        path: 'pensionista-my-suffix/:id/view',
        component: PensionistaMySuffixDetailComponent,
        resolve: {
            pensionista: PensionistaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista-my-suffix/new',
        component: PensionistaMySuffixUpdateComponent,
        resolve: {
            pensionista: PensionistaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista-my-suffix/:id/edit',
        component: PensionistaMySuffixUpdateComponent,
        resolve: {
            pensionista: PensionistaMySuffixResolve
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
        path: 'pensionista-my-suffix/:id/delete',
        component: PensionistaMySuffixDeletePopupComponent,
        resolve: {
            pensionista: PensionistaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
