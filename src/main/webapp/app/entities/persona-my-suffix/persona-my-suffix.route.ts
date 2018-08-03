import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';
import { PersonaMySuffixService } from './persona-my-suffix.service';
import { PersonaMySuffixComponent } from './persona-my-suffix.component';
import { PersonaMySuffixDetailComponent } from './persona-my-suffix-detail.component';
import { PersonaMySuffixUpdateComponent } from './persona-my-suffix-update.component';
import { PersonaMySuffixDeletePopupComponent } from './persona-my-suffix-delete-dialog.component';
import { IPersonaMySuffix } from 'app/shared/model/persona-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PersonaMySuffixResolve implements Resolve<IPersonaMySuffix> {
    constructor(private service: PersonaMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((persona: HttpResponse<PersonaMySuffix>) => persona.body));
        }
        return of(new PersonaMySuffix());
    }
}

export const personaRoute: Routes = [
    {
        path: 'persona-my-suffix',
        component: PersonaMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'persona-my-suffix/:id/view',
        component: PersonaMySuffixDetailComponent,
        resolve: {
            persona: PersonaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'persona-my-suffix/new',
        component: PersonaMySuffixUpdateComponent,
        resolve: {
            persona: PersonaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'persona-my-suffix/:id/edit',
        component: PersonaMySuffixUpdateComponent,
        resolve: {
            persona: PersonaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personaPopupRoute: Routes = [
    {
        path: 'persona-my-suffix/:id/delete',
        component: PersonaMySuffixDeletePopupComponent,
        resolve: {
            persona: PersonaMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
