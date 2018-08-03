import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    DiagnosticoMySuffixComponent,
    DiagnosticoMySuffixDetailComponent,
    DiagnosticoMySuffixUpdateComponent,
    DiagnosticoMySuffixDeletePopupComponent,
    DiagnosticoMySuffixDeleteDialogComponent,
    diagnosticoRoute,
    diagnosticoPopupRoute
} from './';

const ENTITY_STATES = [...diagnosticoRoute, ...diagnosticoPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiagnosticoMySuffixComponent,
        DiagnosticoMySuffixDetailComponent,
        DiagnosticoMySuffixUpdateComponent,
        DiagnosticoMySuffixDeleteDialogComponent,
        DiagnosticoMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DiagnosticoMySuffixComponent,
        DiagnosticoMySuffixUpdateComponent,
        DiagnosticoMySuffixDeleteDialogComponent,
        DiagnosticoMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileDiagnosticoMySuffixModule {}
