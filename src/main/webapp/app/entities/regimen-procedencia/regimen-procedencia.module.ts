import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    RegimenProcedenciaComponent,
    RegimenProcedenciaDetailComponent,
    RegimenProcedenciaUpdateComponent,
    RegimenProcedenciaDeletePopupComponent,
    RegimenProcedenciaDeleteDialogComponent,
    regimenProcedenciaRoute,
    regimenProcedenciaPopupRoute
} from './';

const ENTITY_STATES = [...regimenProcedenciaRoute, ...regimenProcedenciaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RegimenProcedenciaComponent,
        RegimenProcedenciaDetailComponent,
        RegimenProcedenciaUpdateComponent,
        RegimenProcedenciaDeleteDialogComponent,
        RegimenProcedenciaDeletePopupComponent
    ],
    entryComponents: [
        RegimenProcedenciaComponent,
        RegimenProcedenciaUpdateComponent,
        RegimenProcedenciaDeleteDialogComponent,
        RegimenProcedenciaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileRegimenProcedenciaModule {}
