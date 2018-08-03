import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    DiscapacidadMySuffixComponent,
    DiscapacidadMySuffixDetailComponent,
    DiscapacidadMySuffixUpdateComponent,
    DiscapacidadMySuffixDeletePopupComponent,
    DiscapacidadMySuffixDeleteDialogComponent,
    discapacidadRoute,
    discapacidadPopupRoute
} from './';

const ENTITY_STATES = [...discapacidadRoute, ...discapacidadPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiscapacidadMySuffixComponent,
        DiscapacidadMySuffixDetailComponent,
        DiscapacidadMySuffixUpdateComponent,
        DiscapacidadMySuffixDeleteDialogComponent,
        DiscapacidadMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DiscapacidadMySuffixComponent,
        DiscapacidadMySuffixUpdateComponent,
        DiscapacidadMySuffixDeleteDialogComponent,
        DiscapacidadMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileDiscapacidadMySuffixModule {}
