import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';
import { UsuarioMySuffixService } from './usuario-my-suffix.service';
import { UsuarioMySuffixComponent } from './usuario-my-suffix.component';
import { UsuarioMySuffixDetailComponent } from './usuario-my-suffix-detail.component';
import { UsuarioMySuffixUpdateComponent } from './usuario-my-suffix-update.component';
import { UsuarioMySuffixDeletePopupComponent } from './usuario-my-suffix-delete-dialog.component';
import { IUsuarioMySuffix } from 'app/shared/model/usuario-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class UsuarioMySuffixResolve implements Resolve<IUsuarioMySuffix> {
    constructor(private service: UsuarioMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((usuario: HttpResponse<UsuarioMySuffix>) => usuario.body));
        }
        return of(new UsuarioMySuffix());
    }
}

export const usuarioRoute: Routes = [
    {
        path: 'usuario-my-suffix',
        component: UsuarioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuario-my-suffix/:id/view',
        component: UsuarioMySuffixDetailComponent,
        resolve: {
            usuario: UsuarioMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuario-my-suffix/new',
        component: UsuarioMySuffixUpdateComponent,
        resolve: {
            usuario: UsuarioMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuario-my-suffix/:id/edit',
        component: UsuarioMySuffixUpdateComponent,
        resolve: {
            usuario: UsuarioMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: 'usuario-my-suffix/:id/delete',
        component: UsuarioMySuffixDeletePopupComponent,
        resolve: {
            usuario: UsuarioMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
