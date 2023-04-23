import { UserError } from '../../shared/utils/errors/applicationError';

export class NoRelevantAreaError extends UserError {
    constructor() {
        super('Coordinate given is not in any of the areas borders', 400);
    }
}
