import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PensionistaComponent,
    PensionistaDetailComponent,
    PensionistaUpdateComponent,
    PensionistaDeletePopupComponent,
    PensionistaDeleteDialogComponent,
    pensionistaRoute,
    pensionistaPopupRoute
} from './';

const ENTITY_STATES = [...pensionistaRoute, ...pensionistaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PensionistaComponent,
        PensionistaDetailComponent,
        PensionistaUpdateComponent,
        PensionistaDeleteDialogComponent,
        PensionistaDeletePopupComponent
    ],
    entryComponents: [PensionistaComponent, PensionistaUpdateComponent, PensionistaDeleteDialogComponent, PensionistaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePensionistaModule {}
