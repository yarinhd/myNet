import { UserError } from 'shared-atom/utils/errors/applicationError';

export class ForbiddenPropertiesError extends UserError {
    constructor() {
        super('item given in a mission can be updated only by a director', 403);
    }
}
