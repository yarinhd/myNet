import { UserError } from 'shared-atom/utils/errors/applicationError';

export class WrongUserError extends UserError {
    constructor() {
        super('Cant edit someones user other than yourselfs', 400);
    }
}
