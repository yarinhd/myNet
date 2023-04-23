import { Router } from 'express';
import ChapterRouter from './chapter/chapter.router';
import LessonRouter from './lesson/lesson.router';
import PakalRouter from './pakal/pakal.router';
import TestRouter from './test/test.router';
import TestByUserRouter from './testByUser/testByUser.router';

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: any, res: any) => {
    res.send('alive');
});

AppRouter.use('/api/lessons', LessonRouter);
AppRouter.use('/api/pakals', PakalRouter);
AppRouter.use('/api/chapters', ChapterRouter);
AppRouter.use('/api/tests', TestRouter);
AppRouter.use('/api/testByUser', TestByUserRouter);

export { AppRouter };
