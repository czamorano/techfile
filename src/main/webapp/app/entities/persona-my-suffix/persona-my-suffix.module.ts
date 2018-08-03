import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PersonaMySuffixComponent,
    PersonaMySuffixDetailComponent,
    PersonaMySuffixUpdateComponent,
    PersonaMySuffixDeletePopupComponent,
    PersonaMySuffixDeleteDialogComponent,
    personaRoute,
    personaPopupRoute
} from './';

const ENTITY_STATES = [...personaRoute, ...personaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonaMySuffixComponent,
        PersonaMySuffixDetailComponent,
        PersonaMySuffixUpdateComponent,
        PersonaMySuffixDeleteDialogComponent,
        PersonaMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PersonaMySuffixComponent,
        PersonaMySuffixUpdateComponent,
        PersonaMySuffixDeleteDialogComponent,
        PersonaMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePersonaMySuffixModule {}
