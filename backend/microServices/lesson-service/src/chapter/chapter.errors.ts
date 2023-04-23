import { UserError } from '../../shared/utils/errors/applicationError';

export class ChapterDescriptionError extends UserError {
    constructor() {
        super('Chapter of lesson must have a description', 400);
    }
}
