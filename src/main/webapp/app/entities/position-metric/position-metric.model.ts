import { BaseEntity } from './../../shared';

export class PositionMetric implements BaseEntity {
    constructor(
        public id?: number,
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
