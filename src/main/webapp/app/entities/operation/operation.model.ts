import { BaseEntity } from './../../shared';

export class Operation implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public modifiedBy?: string,
        public executedAt?: any,
        public amountFrom?: number,
        public amountTo?: number,
        public positionFromId?: number,
        public institutionFromId?: number,
        public positionToId?: number,
        public institutionToId?: number,
    ) {
    }
}
