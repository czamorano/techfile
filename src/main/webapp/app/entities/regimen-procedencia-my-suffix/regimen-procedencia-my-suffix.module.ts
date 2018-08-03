import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    RegimenProcedenciaMySuffixComponent,
    RegimenProcedenciaMySuffixDetailComponent,
    RegimenProcedenciaMySuffixUpdateComponent,
    RegimenProcedenciaMySuffixDeletePopupComponent,
    RegimenProcedenciaMySuffixDeleteDialogComponent,
    regimenProcedenciaRoute,
    regimenProcedenciaPopupRoute
} from './';

const ENTITY_STATES = [...regimenProcedenciaRoute, ...regimenProcedenciaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RegimenProcedenciaMySuffixComponent,
        RegimenProcedenciaMySuffixDetailComponent,
        RegimenProcedenciaMySuffixUpdateComponent,
        RegimenProcedenciaMySuffixDeleteDialogComponent,
        RegimenProcedenciaMySuffixDeletePopupComponent
    ],
    entryComponents: [
        RegimenProcedenciaMySuffixComponent,
        RegimenProcedenciaMySuffixUpdateComponent,
        RegimenProcedenciaMySuffixDeleteDialogComponent,
        RegimenProcedenciaMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileRegimenProcedenciaMySuffixModule {}
