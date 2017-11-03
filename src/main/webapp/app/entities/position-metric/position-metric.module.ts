import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NereusSharedModule } from '../../shared';
import {
    PositionMetricService,
    PositionMetricPopupService,
    PositionMetricComponent,
    PositionMetricDetailComponent,
    PositionMetricDialogComponent,
    PositionMetricPopupComponent,
    PositionMetricDeletePopupComponent,
    PositionMetricDeleteDialogComponent,
    positionMetricRoute,
    positionMetricPopupRoute,
} from './';

const ENTITY_STATES = [
    ...positionMetricRoute,
    ...positionMetricPopupRoute,
];

@NgModule({
    imports: [
        NereusSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PositionMetricComponent,
        PositionMetricDetailComponent,
        PositionMetricDialogComponent,
        PositionMetricDeleteDialogComponent,
        PositionMetricPopupComponent,
        PositionMetricDeletePopupComponent,
    ],
    entryComponents: [
        PositionMetricComponent,
        PositionMetricDialogComponent,
        PositionMetricPopupComponent,
        PositionMetricDeleteDialogComponent,
        PositionMetricDeletePopupComponent,
    ],
    providers: [
        PositionMetricService,
        PositionMetricPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusPositionMetricModule {}
