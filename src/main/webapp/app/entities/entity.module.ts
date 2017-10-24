import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NereusInstitutionModule } from './institution/institution.module';
import { NereusChargeModule } from './charge/charge.module';
import { NereusAssetModule } from './asset/asset.module';
import { NereusPortfolioModule } from './portfolio/portfolio.module';
import { NereusAccountsModule } from './accounts/accounts.module';
import { NereusPositionModule } from './position/position.module';
import { NereusOperationModule } from './operation/operation.module';
import { NereusTransactionModule } from './transaction/transaction.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        NereusInstitutionModule,
        NereusChargeModule,
        NereusAssetModule,
        NereusPortfolioModule,
        NereusAccountsModule,
        NereusPositionModule,
        NereusOperationModule,
        NereusTransactionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NereusEntityModule {}
