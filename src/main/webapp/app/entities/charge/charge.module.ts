import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NereusSharedModule } from '../../shared';
import {
    ChargeService,
    ChargePopupService,
    ChargeComponent,
    ChargeDetailComponent,
    ChargeDialogComponent,
    ChargePopupComponent,
    ChargeDeletePopupComponent,
    ChargeDeleteDialogComponent,
    chargeRoute,
    chargePopupRoute,
} from './';

const ENTITY_STATES = [
    ...chargeRoute,
    ...chargePopupRoute,
];

@NgModule({
    imports: [
        NereusSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChargeComponent,
        ChargeDetailComponent,
        ChargeDialogComponent,
        ChargeDeleteDialogComponent,
        ChargePopupComponent,
        ChargeDeletePopupComponent,
    ],
    entryComponents: [
        ChargeComponent,
        ChargeDialogComponent,
        ChargePopupComponent,
        ChargeDeleteDialogComponent,
        ChargeDeletePopupComponent,
    ],
    providers: [
        ChargeService,
        ChargePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusChargeModule {}
