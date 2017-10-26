import { BaseEntity } from './../../shared';

export const enum TransactionType {
    'DEBIT',
    'CREDIT'
}

export class Transaction implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public modifiedBy?: string,
        public executedAt?: any,
        public description?: string,
        public amount?: number,
        public type?: TransactionType,
        public balance?: number,
        public operationId?: number,
        public positionId?: number,
    ) {
    }
}
