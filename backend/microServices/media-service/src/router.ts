import { Router } from 'express';
import MediaRouter from './media/media.router';
import InfographicRouter from './infographic/infographic.router';

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: any, res: any) => {
    res.send('alive');
});

AppRouter.use('/api/media', MediaRouter);
AppRouter.use('/api/infographic', InfographicRouter);

export { AppRouter };
