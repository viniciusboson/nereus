import { BaseEntity } from './../../shared';

export class Institution implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
    ) {
    }
}
