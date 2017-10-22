import { BaseEntity } from './../../shared';

export class Institution implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public description?: string,
    ) {
    }
}
