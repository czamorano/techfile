import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    ConvivienteMySuffixComponent,
    ConvivienteMySuffixDetailComponent,
    ConvivienteMySuffixUpdateComponent,
    ConvivienteMySuffixDeletePopupComponent,
    ConvivienteMySuffixDeleteDialogComponent,
    convivienteRoute,
    convivientePopupRoute
} from './';

const ENTITY_STATES = [...convivienteRoute, ...convivientePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConvivienteMySuffixComponent,
        ConvivienteMySuffixDetailComponent,
        ConvivienteMySuffixUpdateComponent,
        ConvivienteMySuffixDeleteDialogComponent,
        ConvivienteMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ConvivienteMySuffixComponent,
        ConvivienteMySuffixUpdateComponent,
        ConvivienteMySuffixDeleteDialogComponent,
        ConvivienteMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileConvivienteMySuffixModule {}
