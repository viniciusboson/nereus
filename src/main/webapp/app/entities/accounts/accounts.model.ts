import { BaseEntity } from './../../shared';

export class Accounts implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public description?: string,
        public portfolioId?: number,
        public assets?: BaseEntity[],
        public institutions?: BaseEntity[],
    ) {
    }
}
