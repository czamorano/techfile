import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    ProvinciaMySuffixComponent,
    ProvinciaMySuffixDetailComponent,
    ProvinciaMySuffixUpdateComponent,
    ProvinciaMySuffixDeletePopupComponent,
    ProvinciaMySuffixDeleteDialogComponent,
    provinciaRoute,
    provinciaPopupRoute
} from './';

const ENTITY_STATES = [...provinciaRoute, ...provinciaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProvinciaMySuffixComponent,
        ProvinciaMySuffixDetailComponent,
        ProvinciaMySuffixUpdateComponent,
        ProvinciaMySuffixDeleteDialogComponent,
        ProvinciaMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ProvinciaMySuffixComponent,
        ProvinciaMySuffixUpdateComponent,
        ProvinciaMySuffixDeleteDialogComponent,
        ProvinciaMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileProvinciaMySuffixModule {}
