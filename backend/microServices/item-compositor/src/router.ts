import { Router } from 'express';
import ContentRouter from './content/content.router';
import ItemRouter from './item/item.router';
import UnitRouter from './unit/unit.router';
import AreaRouter from './area/area.router';

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: any, res: any) => {
    res.send('alive');
});

AppRouter.use('/api/items', ItemRouter);
AppRouter.use('/api/content', ContentRouter);
AppRouter.use('/api/units', UnitRouter);
AppRouter.use('/api/areas', AreaRouter);

export { AppRouter };
