import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PensionistaMySuffixComponent,
    PensionistaMySuffixDetailComponent,
    PensionistaMySuffixUpdateComponent,
    PensionistaMySuffixDeletePopupComponent,
    PensionistaMySuffixDeleteDialogComponent,
    pensionistaRoute,
    pensionistaPopupRoute
} from './';

const ENTITY_STATES = [...pensionistaRoute, ...pensionistaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PensionistaMySuffixComponent,
        PensionistaMySuffixDetailComponent,
        PensionistaMySuffixUpdateComponent,
        PensionistaMySuffixDeleteDialogComponent,
        PensionistaMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PensionistaMySuffixComponent,
        PensionistaMySuffixUpdateComponent,
        PensionistaMySuffixDeleteDialogComponent,
        PensionistaMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePensionistaMySuffixModule {}
