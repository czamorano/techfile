import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    UsuarioMySuffixComponent,
    UsuarioMySuffixDetailComponent,
    UsuarioMySuffixUpdateComponent,
    UsuarioMySuffixDeletePopupComponent,
    UsuarioMySuffixDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute
} from './';

const ENTITY_STATES = [...usuarioRoute, ...usuarioPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UsuarioMySuffixComponent,
        UsuarioMySuffixDetailComponent,
        UsuarioMySuffixUpdateComponent,
        UsuarioMySuffixDeleteDialogComponent,
        UsuarioMySuffixDeletePopupComponent
    ],
    entryComponents: [
        UsuarioMySuffixComponent,
        UsuarioMySuffixUpdateComponent,
        UsuarioMySuffixDeleteDialogComponent,
        UsuarioMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileUsuarioMySuffixModule {}
