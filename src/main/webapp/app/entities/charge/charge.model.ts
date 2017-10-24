import { BaseEntity } from './../../shared';

export const enum ChargeType {
    'FLAT_FEE',
    'PERCENTAGE'
}

export const enum OperationType {
    'WIRE_TRANSFER',
    'WITHDRAW',
    'DEPOSIT',
    'BUY',
    'SELL'
}

export class Charge implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public description?: string,
        public chargeType?: ChargeType,
        public operationType?: OperationType,
        public amount?: number,
        public institutionId?: number,
    ) {
    }
}
