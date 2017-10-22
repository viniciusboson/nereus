import { BaseEntity } from './../../shared';

export class Accounts implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public description?: string,
        public wallets?: BaseEntity[],
    ) {
    }
}
