import { Router } from 'express';
import ArticleRouter from './article/article.router';
import CommentRouter from './comment/comment.router';
import MyWikiRouter from './myWiki/myWiki.router';
import NewsRouter from './news/news.router';

const AppRouter: Router = Router();

AppRouter.get('/isalive', (req: any, res: any) => {
    res.send('alive');
});

AppRouter.use('/api/myWiki', MyWikiRouter);
AppRouter.use('/api/news', NewsRouter);
AppRouter.use('/api/articles', ArticleRouter);
AppRouter.use('/api/comments', CommentRouter);

export { AppRouter };
