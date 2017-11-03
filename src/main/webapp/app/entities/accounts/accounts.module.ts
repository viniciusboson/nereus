import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NereusSharedModule } from '../../shared';
import {
    AccountsService,
    AccountsPopupService,
    AccountsComponent,
    AccountsDetailComponent,
    AccountsDialogComponent,
    AccountsPopupComponent,
    AccountsDeletePopupComponent,
    AccountsDeleteDialogComponent,
    accountsRoute,
    accountsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...accountsRoute,
    ...accountsPopupRoute,
];

@NgModule({
    imports: [
        NereusSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AccountsComponent,
        AccountsDetailComponent,
        AccountsDialogComponent,
        AccountsDeleteDialogComponent,
        AccountsPopupComponent,
        AccountsDeletePopupComponent,
    ],
    entryComponents: [
        AccountsComponent,
        AccountsDialogComponent,
        AccountsPopupComponent,
        AccountsDeleteDialogComponent,
        AccountsDeletePopupComponent,
    ],
    providers: [
        AccountsService,
        AccountsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusAccountsModule {}
