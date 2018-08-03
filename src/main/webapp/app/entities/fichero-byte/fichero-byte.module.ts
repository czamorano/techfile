import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    FicheroByteComponent,
    FicheroByteDetailComponent,
    FicheroByteUpdateComponent,
    FicheroByteDeletePopupComponent,
    FicheroByteDeleteDialogComponent,
    ficheroByteRoute,
    ficheroBytePopupRoute
} from './';

const ENTITY_STATES = [...ficheroByteRoute, ...ficheroBytePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheroByteComponent,
        FicheroByteDetailComponent,
        FicheroByteUpdateComponent,
        FicheroByteDeleteDialogComponent,
        FicheroByteDeletePopupComponent
    ],
    entryComponents: [FicheroByteComponent, FicheroByteUpdateComponent, FicheroByteDeleteDialogComponent, FicheroByteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileFicheroByteModule {}
