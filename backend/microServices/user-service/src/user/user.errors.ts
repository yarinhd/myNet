import { UserError } from '../../shared/utils/errors/applicationError';

export class WrongUserError extends UserError {
    constructor() {
        super('Cant edit someones user other than yourselfs', 400);
    }
}
