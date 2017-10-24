import { BaseEntity } from './../../shared';

export const enum AssetType {
    'COMMODITY',
    'CURRENCY',
    'FUTURE',
    'INDICE',
    'OPTION',
    'STOCK'
}

export class Asset implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public description?: string,
        public code?: string,
        public symbol?: string,
        public type?: AssetType,
    ) {
    }
}
