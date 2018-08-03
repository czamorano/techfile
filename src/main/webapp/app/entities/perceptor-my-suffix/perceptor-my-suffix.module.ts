import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PerceptorMySuffixComponent,
    PerceptorMySuffixDetailComponent,
    PerceptorMySuffixUpdateComponent,
    PerceptorMySuffixDeletePopupComponent,
    PerceptorMySuffixDeleteDialogComponent,
    perceptorRoute,
    perceptorPopupRoute
} from './';

const ENTITY_STATES = [...perceptorRoute, ...perceptorPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerceptorMySuffixComponent,
        PerceptorMySuffixDetailComponent,
        PerceptorMySuffixUpdateComponent,
        PerceptorMySuffixDeleteDialogComponent,
        PerceptorMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PerceptorMySuffixComponent,
        PerceptorMySuffixUpdateComponent,
        PerceptorMySuffixDeleteDialogComponent,
        PerceptorMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePerceptorMySuffixModule {}
