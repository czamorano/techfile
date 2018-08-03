import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    EtiologiaMySuffixComponent,
    EtiologiaMySuffixDetailComponent,
    EtiologiaMySuffixUpdateComponent,
    EtiologiaMySuffixDeletePopupComponent,
    EtiologiaMySuffixDeleteDialogComponent,
    etiologiaRoute,
    etiologiaPopupRoute
} from './';

const ENTITY_STATES = [...etiologiaRoute, ...etiologiaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EtiologiaMySuffixComponent,
        EtiologiaMySuffixDetailComponent,
        EtiologiaMySuffixUpdateComponent,
        EtiologiaMySuffixDeleteDialogComponent,
        EtiologiaMySuffixDeletePopupComponent
    ],
    entryComponents: [
        EtiologiaMySuffixComponent,
        EtiologiaMySuffixUpdateComponent,
        EtiologiaMySuffixDeleteDialogComponent,
        EtiologiaMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileEtiologiaMySuffixModule {}
