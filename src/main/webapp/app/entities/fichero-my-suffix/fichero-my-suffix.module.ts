import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    FicheroMySuffixComponent,
    FicheroMySuffixDetailComponent,
    FicheroMySuffixUpdateComponent,
    FicheroMySuffixDeletePopupComponent,
    FicheroMySuffixDeleteDialogComponent,
    ficheroRoute,
    ficheroPopupRoute
} from './';

const ENTITY_STATES = [...ficheroRoute, ...ficheroPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheroMySuffixComponent,
        FicheroMySuffixDetailComponent,
        FicheroMySuffixUpdateComponent,
        FicheroMySuffixDeleteDialogComponent,
        FicheroMySuffixDeletePopupComponent
    ],
    entryComponents: [
        FicheroMySuffixComponent,
        FicheroMySuffixUpdateComponent,
        FicheroMySuffixDeleteDialogComponent,
        FicheroMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileFicheroMySuffixModule {}
