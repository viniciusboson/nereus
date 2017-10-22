import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NereusAccountsModule } from './accounts/accounts.module';
import { NereusAssetModule } from './asset/asset.module';
import { NereusWalletModule } from './wallet/wallet.module';
import { NereusInstitutionModule } from './institution/institution.module';
import { NereusChargeModule } from './charge/charge.module';
import { NereusOperationModule } from './operation/operation.module';
import { NereusTransactionModule } from './transaction/transaction.module';
import { NereusPositionModule } from './position/position.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NereusAccountsModule,
        NereusAssetModule,
        NereusWalletModule,
        NereusInstitutionModule,
        NereusChargeModule,
        NereusOperationModule,
        NereusTransactionModule,
        NereusPositionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusEntityModule {}
