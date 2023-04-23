import { ContentType } from '../../common/enums/ContentType';
import { IAllContent, IContentQuery } from '../../common/interfaces/content.interface';
import { RPCFunctionError } from '../../shared/utils/errors/validationError';
import { LessonRPCService } from '../../shared/utils/rpc/services/lesson.RPCservice';
import { MediaRPCService } from '../../shared/utils/rpc/services/media.RPCservice';

export const routeToRPCGetter = async (query: IContentQuery): Promise<IAllContent> => {
    switch (query.contentType) {
        case ContentType.LESSON:
            return LessonRPCService.getLessonById(query.contentId);
        case ContentType.PAKAL:
            return LessonRPCService.getPakalById(query.contentId);
        case ContentType.PODCAST:
            return MediaRPCService.getMediaById(query.contentId);
        case ContentType.VIDEO:
            return MediaRPCService.getMediaById(query.contentId);
        case ContentType.INFOGRAPHIC:
            return MediaRPCService.getInfographicById(query.contentId);
        default:
            throw new RPCFunctionError();
    }
};
