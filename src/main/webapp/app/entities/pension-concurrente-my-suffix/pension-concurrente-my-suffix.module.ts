import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PensionConcurrenteMySuffixComponent,
    PensionConcurrenteMySuffixDetailComponent,
    PensionConcurrenteMySuffixUpdateComponent,
    PensionConcurrenteMySuffixDeletePopupComponent,
    PensionConcurrenteMySuffixDeleteDialogComponent,
    pensionConcurrenteRoute,
    pensionConcurrentePopupRoute
} from './';

const ENTITY_STATES = [...pensionConcurrenteRoute, ...pensionConcurrentePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PensionConcurrenteMySuffixComponent,
        PensionConcurrenteMySuffixDetailComponent,
        PensionConcurrenteMySuffixUpdateComponent,
        PensionConcurrenteMySuffixDeleteDialogComponent,
        PensionConcurrenteMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PensionConcurrenteMySuffixComponent,
        PensionConcurrenteMySuffixUpdateComponent,
        PensionConcurrenteMySuffixDeleteDialogComponent,
        PensionConcurrenteMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePensionConcurrenteMySuffixModule {}
