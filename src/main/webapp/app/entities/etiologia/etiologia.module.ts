import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    EtiologiaComponent,
    EtiologiaDetailComponent,
    EtiologiaUpdateComponent,
    EtiologiaDeletePopupComponent,
    EtiologiaDeleteDialogComponent,
    etiologiaRoute,
    etiologiaPopupRoute
} from './';

const ENTITY_STATES = [...etiologiaRoute, ...etiologiaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EtiologiaComponent,
        EtiologiaDetailComponent,
        EtiologiaUpdateComponent,
        EtiologiaDeleteDialogComponent,
        EtiologiaDeletePopupComponent
    ],
    entryComponents: [EtiologiaComponent, EtiologiaUpdateComponent, EtiologiaDeleteDialogComponent, EtiologiaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileEtiologiaModule {}
