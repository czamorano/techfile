import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    AutonomiaComponent,
    AutonomiaDetailComponent,
    AutonomiaUpdateComponent,
    AutonomiaDeletePopupComponent,
    AutonomiaDeleteDialogComponent,
    autonomiaRoute,
    autonomiaPopupRoute
} from './';

const ENTITY_STATES = [...autonomiaRoute, ...autonomiaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AutonomiaComponent,
        AutonomiaDetailComponent,
        AutonomiaUpdateComponent,
        AutonomiaDeleteDialogComponent,
        AutonomiaDeletePopupComponent
    ],
    entryComponents: [AutonomiaComponent, AutonomiaUpdateComponent, AutonomiaDeleteDialogComponent, AutonomiaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileAutonomiaModule {}
