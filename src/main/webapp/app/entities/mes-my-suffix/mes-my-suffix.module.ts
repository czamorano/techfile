import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    MesMySuffixComponent,
    MesMySuffixDetailComponent,
    MesMySuffixUpdateComponent,
    MesMySuffixDeletePopupComponent,
    MesMySuffixDeleteDialogComponent,
    mesRoute,
    mesPopupRoute
} from './';

const ENTITY_STATES = [...mesRoute, ...mesPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MesMySuffixComponent,
        MesMySuffixDetailComponent,
        MesMySuffixUpdateComponent,
        MesMySuffixDeleteDialogComponent,
        MesMySuffixDeletePopupComponent
    ],
    entryComponents: [MesMySuffixComponent, MesMySuffixUpdateComponent, MesMySuffixDeleteDialogComponent, MesMySuffixDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileMesMySuffixModule {}
