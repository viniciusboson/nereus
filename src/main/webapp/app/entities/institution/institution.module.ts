import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NereusSharedModule } from '../../shared';
import {
    InstitutionService,
    InstitutionPopupService,
    InstitutionComponent,
    InstitutionDetailComponent,
    InstitutionDialogComponent,
    InstitutionPopupComponent,
    InstitutionDeletePopupComponent,
    InstitutionDeleteDialogComponent,
    institutionRoute,
    institutionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...institutionRoute,
    ...institutionPopupRoute,
];

@NgModule({
    imports: [
        NereusSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        InstitutionComponent,
        InstitutionDetailComponent,
        InstitutionDialogComponent,
        InstitutionDeleteDialogComponent,
        InstitutionPopupComponent,
        InstitutionDeletePopupComponent,
    ],
    entryComponents: [
        InstitutionComponent,
        InstitutionDialogComponent,
        InstitutionPopupComponent,
        InstitutionDeleteDialogComponent,
        InstitutionDeletePopupComponent,
    ],
    providers: [
        InstitutionService,
        InstitutionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusInstitutionModule {}
