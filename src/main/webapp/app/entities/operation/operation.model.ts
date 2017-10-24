import { BaseEntity } from './../../shared';

export class Operation implements BaseEntity {
    constructor(
        public id?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public executedAt?: any,
        public fromAmount?: number,
        public toAmount?: number,
        public fromPositionId?: number,
        public fromInstitutionId?: number,
        public toPositionId?: number,
        public toInstitutionId?: number,
    ) {
    }
}
