import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    DiscapacidadComponent,
    DiscapacidadDetailComponent,
    DiscapacidadUpdateComponent,
    DiscapacidadDeletePopupComponent,
    DiscapacidadDeleteDialogComponent,
    discapacidadRoute,
    discapacidadPopupRoute
} from './';

const ENTITY_STATES = [...discapacidadRoute, ...discapacidadPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiscapacidadComponent,
        DiscapacidadDetailComponent,
        DiscapacidadUpdateComponent,
        DiscapacidadDeleteDialogComponent,
        DiscapacidadDeletePopupComponent
    ],
    entryComponents: [
        DiscapacidadComponent,
        DiscapacidadUpdateComponent,
        DiscapacidadDeleteDialogComponent,
        DiscapacidadDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileDiscapacidadModule {}
