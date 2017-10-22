import { BaseEntity } from './../../shared';

export class Wallet implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public description?: string,
        public accountId?: number,
        public assets?: BaseEntity[],
        public institutions?: BaseEntity[],
    ) {
    }
}
