import { UserError } from 'shared-atom/utils/errors/applicationError';

export class EditorPermissionError extends UserError {
    constructor() {
        super('Only editors can be assigned for missions', 400);
    }
}
