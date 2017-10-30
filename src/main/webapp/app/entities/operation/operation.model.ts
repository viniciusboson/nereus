import { BaseEntity } from './../../shared';

export const enum OperationType {
    'WIRE_TRANSFER',
    'WITHDRAW',
    'DEPOSIT',
    'BUY',
    'SELL'
}

export class Operation implements BaseEntity {
    constructor(
        public id?: number,
        public executedAt?: any,
        public amountFrom?: number,
        public amountTo?: number,
        public operationType?: OperationType,
        public positionFromId?: number,
        public institutionFromId?: number,
        public positionToId?: number,
        public institutionToId?: number,
    ) {
    }
}
