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

export const enum ChargeTarget {
    'ORIGIN',
    'DESTINATION',
    'BOTH'
}

export class Charge implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public chargeType?: ChargeType,
        public operationType?: OperationType,
        public amount?: number,
        public target?: ChargeTarget,
        public institutionId?: number,
        public assets?: BaseEntity[],
    ) {
    }
}
