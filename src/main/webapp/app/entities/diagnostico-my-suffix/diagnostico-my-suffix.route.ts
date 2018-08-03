import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';
import { DiagnosticoMySuffixService } from './diagnostico-my-suffix.service';
import { DiagnosticoMySuffixComponent } from './diagnostico-my-suffix.component';
import { DiagnosticoMySuffixDetailComponent } from './diagnostico-my-suffix-detail.component';
import { DiagnosticoMySuffixUpdateComponent } from './diagnostico-my-suffix-update.component';
import { DiagnosticoMySuffixDeletePopupComponent } from './diagnostico-my-suffix-delete-dialog.component';
import { IDiagnosticoMySuffix } from 'app/shared/model/diagnostico-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DiagnosticoMySuffixResolve implements Resolve<IDiagnosticoMySuffix> {
    constructor(private service: DiagnosticoMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((diagnostico: HttpResponse<DiagnosticoMySuffix>) => diagnostico.body));
        }
        return of(new DiagnosticoMySuffix());
    }
}

export const diagnosticoRoute: Routes = [
    {
        path: 'diagnostico-my-suffix',
        component: DiagnosticoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico-my-suffix/:id/view',
        component: DiagnosticoMySuffixDetailComponent,
        resolve: {
            diagnostico: DiagnosticoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico-my-suffix/new',
        component: DiagnosticoMySuffixUpdateComponent,
        resolve: {
            diagnostico: DiagnosticoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico-my-suffix/:id/edit',
        component: DiagnosticoMySuffixUpdateComponent,
        resolve: {
            diagnostico: DiagnosticoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diagnosticoPopupRoute: Routes = [
    {
        path: 'diagnostico-my-suffix/:id/delete',
        component: DiagnosticoMySuffixDeletePopupComponent,
        resolve: {
            diagnostico: DiagnosticoMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
