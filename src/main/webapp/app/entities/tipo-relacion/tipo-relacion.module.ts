import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    TipoRelacionComponent,
    TipoRelacionDetailComponent,
    TipoRelacionUpdateComponent,
    TipoRelacionDeletePopupComponent,
    TipoRelacionDeleteDialogComponent,
    tipoRelacionRoute,
    tipoRelacionPopupRoute
} from './';

const ENTITY_STATES = [...tipoRelacionRoute, ...tipoRelacionPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoRelacionComponent,
        TipoRelacionDetailComponent,
        TipoRelacionUpdateComponent,
        TipoRelacionDeleteDialogComponent,
        TipoRelacionDeletePopupComponent
    ],
    entryComponents: [
        TipoRelacionComponent,
        TipoRelacionUpdateComponent,
        TipoRelacionDeleteDialogComponent,
        TipoRelacionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileTipoRelacionModule {}
