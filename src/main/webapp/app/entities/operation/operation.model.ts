import { BaseEntity } from './../../shared';

export class Operation implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public fromAmount?: number,
        public toAmount?: number,
        public fromWalletId?: number,
        public fromInstitutionId?: number,
        public fromAssetId?: number,
        public toWalletId?: number,
        public toAssetId?: number,
        public toInstitutionId?: number,
    ) {
    }
}
