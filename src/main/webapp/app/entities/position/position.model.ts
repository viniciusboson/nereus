import { BaseEntity } from './../../shared';

export const enum PositionType {
    'LONG',
    'SHORT',
    'FLAT'
}

export const enum PositionStatus {
    'OPEN',
    'CLOSED'
}

export class Position implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public description?: string,
        public balance?: number,
        public type?: PositionType,
        public status?: PositionStatus,
        public assetId?: number,
        public accountId?: number,
    ) {
    }
}
