import { BaseEntity } from './../../shared';

export class Portfolio implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public accounts?: BaseEntity[],
    ) {
    }
}
