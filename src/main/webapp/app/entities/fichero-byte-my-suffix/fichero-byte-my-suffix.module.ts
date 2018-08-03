import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    FicheroByteMySuffixComponent,
    FicheroByteMySuffixDetailComponent,
    FicheroByteMySuffixUpdateComponent,
    FicheroByteMySuffixDeletePopupComponent,
    FicheroByteMySuffixDeleteDialogComponent,
    ficheroByteRoute,
    ficheroBytePopupRoute
} from './';

const ENTITY_STATES = [...ficheroByteRoute, ...ficheroBytePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheroByteMySuffixComponent,
        FicheroByteMySuffixDetailComponent,
        FicheroByteMySuffixUpdateComponent,
        FicheroByteMySuffixDeleteDialogComponent,
        FicheroByteMySuffixDeletePopupComponent
    ],
    entryComponents: [
        FicheroByteMySuffixComponent,
        FicheroByteMySuffixUpdateComponent,
        FicheroByteMySuffixDeleteDialogComponent,
        FicheroByteMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileFicheroByteMySuffixModule {}
