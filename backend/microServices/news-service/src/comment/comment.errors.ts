import { UserError } from '../../shared/utils/errors/applicationError';

export class WrongUserError extends UserError {
    constructor() {
        super('The user requesting isnt the commenter', 400);
    }
}
