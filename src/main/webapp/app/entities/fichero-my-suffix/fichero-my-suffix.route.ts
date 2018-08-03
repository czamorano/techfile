import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';
import { FicheroMySuffixService } from './fichero-my-suffix.service';
import { FicheroMySuffixComponent } from './fichero-my-suffix.component';
import { FicheroMySuffixDetailComponent } from './fichero-my-suffix-detail.component';
import { FicheroMySuffixUpdateComponent } from './fichero-my-suffix-update.component';
import { FicheroMySuffixDeletePopupComponent } from './fichero-my-suffix-delete-dialog.component';
import { IFicheroMySuffix } from 'app/shared/model/fichero-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class FicheroMySuffixResolve implements Resolve<IFicheroMySuffix> {
    constructor(private service: FicheroMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fichero: HttpResponse<FicheroMySuffix>) => fichero.body));
        }
        return of(new FicheroMySuffix());
    }
}

export const ficheroRoute: Routes = [
    {
        path: 'fichero-my-suffix',
        component: FicheroMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-my-suffix/:id/view',
        component: FicheroMySuffixDetailComponent,
        resolve: {
            fichero: FicheroMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-my-suffix/new',
        component: FicheroMySuffixUpdateComponent,
        resolve: {
            fichero: FicheroMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-my-suffix/:id/edit',
        component: FicheroMySuffixUpdateComponent,
        resolve: {
            fichero: FicheroMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheroPopupRoute: Routes = [
    {
        path: 'fichero-my-suffix/:id/delete',
        component: FicheroMySuffixDeletePopupComponent,
        resolve: {
            fichero: FicheroMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
