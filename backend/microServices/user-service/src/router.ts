import { Router } from 'express';
import UserRouter from './user/user.router';
import MissionRouter from './mission/mission.router';

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: any, res: any) => {
    res.send('alive');
});

AppRouter.use('/api/users', UserRouter);
AppRouter.use('/api/missions', MissionRouter);

export { AppRouter };
