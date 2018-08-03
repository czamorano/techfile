import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    FicheroComponent,
    FicheroDetailComponent,
    FicheroUpdateComponent,
    FicheroDeletePopupComponent,
    FicheroDeleteDialogComponent,
    ficheroRoute,
    ficheroPopupRoute
} from './';

const ENTITY_STATES = [...ficheroRoute, ...ficheroPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheroComponent,
        FicheroDetailComponent,
        FicheroUpdateComponent,
        FicheroDeleteDialogComponent,
        FicheroDeletePopupComponent
    ],
    entryComponents: [FicheroComponent, FicheroUpdateComponent, FicheroDeleteDialogComponent, FicheroDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileFicheroModule {}
