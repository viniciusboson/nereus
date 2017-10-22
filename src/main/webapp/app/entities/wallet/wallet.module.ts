import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NereusSharedModule } from '../../shared';
import {
    WalletService,
    WalletPopupService,
    WalletComponent,
    WalletDetailComponent,
    WalletDialogComponent,
    WalletPopupComponent,
    WalletDeletePopupComponent,
    WalletDeleteDialogComponent,
    walletRoute,
    walletPopupRoute,
} from './';

const ENTITY_STATES = [
    ...walletRoute,
    ...walletPopupRoute,
];

@NgModule({
    imports: [
        NereusSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WalletComponent,
        WalletDetailComponent,
        WalletDialogComponent,
        WalletDeleteDialogComponent,
        WalletPopupComponent,
        WalletDeletePopupComponent,
    ],
    entryComponents: [
        WalletComponent,
        WalletDialogComponent,
        WalletPopupComponent,
        WalletDeleteDialogComponent,
        WalletDeletePopupComponent,
    ],
    providers: [
        WalletService,
        WalletPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusWalletModule {}
