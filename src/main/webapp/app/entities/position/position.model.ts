import { BaseEntity } from './../../shared';

export class Position implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public balance?: number,
        public assetId?: number,
        public walletId?: number,
    ) {
    }
}
