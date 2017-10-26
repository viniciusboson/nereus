import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NereusSharedModule } from '../../shared';
import {
    PortfolioService,
    PortfolioPopupService,
    PortfolioComponent,
    PortfolioDetailComponent,
    PortfolioDialogComponent,
    PortfolioPopupComponent,
    PortfolioDeletePopupComponent,
    PortfolioDeleteDialogComponent,
    portfolioRoute,
    portfolioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...portfolioRoute,
    ...portfolioPopupRoute,
];

@NgModule({
    imports: [
        NereusSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PortfolioComponent,
        PortfolioDetailComponent,
        PortfolioDialogComponent,
        PortfolioDeleteDialogComponent,
        PortfolioPopupComponent,
        PortfolioDeletePopupComponent,
    ],
    entryComponents: [
        PortfolioComponent,
        PortfolioDialogComponent,
        PortfolioPopupComponent,
        PortfolioDeleteDialogComponent,
        PortfolioDeletePopupComponent,
    ],
    providers: [
        PortfolioService,
        PortfolioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusPortfolioModule {}
