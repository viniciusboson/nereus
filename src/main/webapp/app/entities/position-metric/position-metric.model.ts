import { BaseEntity } from './../../shared';

export class PositionMetric implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public modifiedBy?: string,
        public entryAvgPrice?: number,
        public entryAmount?: number,
        public exitAvgPrice?: number,
        public exitAmount?: number,
        public txCosts?: number,
        public positionId?: number,
        public assetComparisonId?: number,
    ) {
    }
}
