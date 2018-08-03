import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    MesComponent,
    MesDetailComponent,
    MesUpdateComponent,
    MesDeletePopupComponent,
    MesDeleteDialogComponent,
    mesRoute,
    mesPopupRoute
} from './';

const ENTITY_STATES = [...mesRoute, ...mesPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MesComponent, MesDetailComponent, MesUpdateComponent, MesDeleteDialogComponent, MesDeletePopupComponent],
    entryComponents: [MesComponent, MesUpdateComponent, MesDeleteDialogComponent, MesDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileMesModule {}
