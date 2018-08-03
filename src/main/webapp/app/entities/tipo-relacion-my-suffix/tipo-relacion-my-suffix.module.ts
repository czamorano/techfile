import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    TipoRelacionMySuffixComponent,
    TipoRelacionMySuffixDetailComponent,
    TipoRelacionMySuffixUpdateComponent,
    TipoRelacionMySuffixDeletePopupComponent,
    TipoRelacionMySuffixDeleteDialogComponent,
    tipoRelacionRoute,
    tipoRelacionPopupRoute
} from './';

const ENTITY_STATES = [...tipoRelacionRoute, ...tipoRelacionPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoRelacionMySuffixComponent,
        TipoRelacionMySuffixDetailComponent,
        TipoRelacionMySuffixUpdateComponent,
        TipoRelacionMySuffixDeleteDialogComponent,
        TipoRelacionMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TipoRelacionMySuffixComponent,
        TipoRelacionMySuffixUpdateComponent,
        TipoRelacionMySuffixDeleteDialogComponent,
        TipoRelacionMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileTipoRelacionMySuffixModule {}
