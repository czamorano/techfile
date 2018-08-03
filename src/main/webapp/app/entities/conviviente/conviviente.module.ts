import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    ConvivienteComponent,
    ConvivienteDetailComponent,
    ConvivienteUpdateComponent,
    ConvivienteDeletePopupComponent,
    ConvivienteDeleteDialogComponent,
    convivienteRoute,
    convivientePopupRoute
} from './';

const ENTITY_STATES = [...convivienteRoute, ...convivientePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConvivienteComponent,
        ConvivienteDetailComponent,
        ConvivienteUpdateComponent,
        ConvivienteDeleteDialogComponent,
        ConvivienteDeletePopupComponent
    ],
    entryComponents: [ConvivienteComponent, ConvivienteUpdateComponent, ConvivienteDeleteDialogComponent, ConvivienteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileConvivienteModule {}
