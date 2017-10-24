import { BaseEntity } from './../../shared';

export class Portfolio implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public modifiedBy?: string,
        public description?: string,
        public accounts?: BaseEntity[],
    ) {
    }
}
