import * as jayson from 'jayson/promise';
import { RPCServerRequest } from 'shared-atom/utils/rpc/rpc.functions';
import { LessonManager } from './lesson/lesson.manager';
import { canGetLessonById } from './lesson/lesson.validator';
import { PakalManager } from './pakal/pakal.manager';
import { canGetPakalById } from './pakal/pakal.validator';
import { ChapterManager } from './chapter/chapter.manager';
import { canGetChapterById } from './chapter/chapter.validator';

export const RPCServer = new jayson.Server({
    getLessonById: RPCServerRequest(LessonManager.getLessonById, canGetLessonById),
    getPakalById: RPCServerRequest(PakalManager.getPakalById, canGetPakalById),
    getChapterById: RPCServerRequest(ChapterManager.getChapterById, canGetChapterById),
});
