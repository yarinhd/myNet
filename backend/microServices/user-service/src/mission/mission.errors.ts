import { UserError } from '../../shared/utils/errors/applicationError';

export class EditorPermissionError extends UserError {
    constructor() {
        super('Only editors can be assigned for missions', 400);
    }
}
