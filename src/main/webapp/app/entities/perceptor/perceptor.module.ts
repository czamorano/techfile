import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PerceptorComponent,
    PerceptorDetailComponent,
    PerceptorUpdateComponent,
    PerceptorDeletePopupComponent,
    PerceptorDeleteDialogComponent,
    perceptorRoute,
    perceptorPopupRoute
} from './';

const ENTITY_STATES = [...perceptorRoute, ...perceptorPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerceptorComponent,
        PerceptorDetailComponent,
        PerceptorUpdateComponent,
        PerceptorDeleteDialogComponent,
        PerceptorDeletePopupComponent
    ],
    entryComponents: [PerceptorComponent, PerceptorUpdateComponent, PerceptorDeleteDialogComponent, PerceptorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePerceptorModule {}
