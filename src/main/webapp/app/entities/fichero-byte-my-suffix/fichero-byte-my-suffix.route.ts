import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';
import { FicheroByteMySuffixService } from './fichero-byte-my-suffix.service';
import { FicheroByteMySuffixComponent } from './fichero-byte-my-suffix.component';
import { FicheroByteMySuffixDetailComponent } from './fichero-byte-my-suffix-detail.component';
import { FicheroByteMySuffixUpdateComponent } from './fichero-byte-my-suffix-update.component';
import { FicheroByteMySuffixDeletePopupComponent } from './fichero-byte-my-suffix-delete-dialog.component';
import { IFicheroByteMySuffix } from 'app/shared/model/fichero-byte-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class FicheroByteMySuffixResolve implements Resolve<IFicheroByteMySuffix> {
    constructor(private service: FicheroByteMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ficheroByte: HttpResponse<FicheroByteMySuffix>) => ficheroByte.body));
        }
        return of(new FicheroByteMySuffix());
    }
}

export const ficheroByteRoute: Routes = [
    {
        path: 'fichero-byte-my-suffix',
        component: FicheroByteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte-my-suffix/:id/view',
        component: FicheroByteMySuffixDetailComponent,
        resolve: {
            ficheroByte: FicheroByteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte-my-suffix/new',
        component: FicheroByteMySuffixUpdateComponent,
        resolve: {
            ficheroByte: FicheroByteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte-my-suffix/:id/edit',
        component: FicheroByteMySuffixUpdateComponent,
        resolve: {
            ficheroByte: FicheroByteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheroBytePopupRoute: Routes = [
    {
        path: 'fichero-byte-my-suffix/:id/delete',
        component: FicheroByteMySuffixDeletePopupComponent,
        resolve: {
            ficheroByte: FicheroByteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
