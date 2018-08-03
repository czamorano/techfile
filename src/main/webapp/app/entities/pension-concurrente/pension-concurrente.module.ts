import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PensionConcurrenteComponent,
    PensionConcurrenteDetailComponent,
    PensionConcurrenteUpdateComponent,
    PensionConcurrenteDeletePopupComponent,
    PensionConcurrenteDeleteDialogComponent,
    pensionConcurrenteRoute,
    pensionConcurrentePopupRoute
} from './';

const ENTITY_STATES = [...pensionConcurrenteRoute, ...pensionConcurrentePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PensionConcurrenteComponent,
        PensionConcurrenteDetailComponent,
        PensionConcurrenteUpdateComponent,
        PensionConcurrenteDeleteDialogComponent,
        PensionConcurrenteDeletePopupComponent
    ],
    entryComponents: [
        PensionConcurrenteComponent,
        PensionConcurrenteUpdateComponent,
        PensionConcurrenteDeleteDialogComponent,
        PensionConcurrenteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePensionConcurrenteModule {}
