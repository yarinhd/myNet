import React, { useContext, useEffect } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import { Context } from './Store';
// import useWrapFetch from './hooks/useWrapFetch';
// import { IUser } from './common/interfaces/user.interface';
import PrivateRoute from './PrivateRouter';
import HomePage from './pages/Mynet/HomePage/HomePage';
import ErrorPage from './pages/Error/Error';
import Loading from './components/Tools/Loading/Loading';
import ContentSharePage from './pages/Mynet/ContentSharePage/ContentSharePage';
import MyWiki from './pages/Mynet/MyWiki/MyWiki';
import SearchPage from './pages/Mynet/Search/Search';

const AppRoutes: React.FC = () => {
    const [state, dispatch] = useContext(Context);
    // const getMyUserWrapped = useWrapFetch(getMyUser)();
    const { isLoading } = state;

    useEffect(() => {
        // getMyUserWrapped((user) => dispatch({ type: 'SET_USER', payload: user as IUser }));
    }, []);

    const routes: RouteObject[] = [
        {
            path: '/*',
            index: true,
            element: <PrivateRoute component={HomePage} />,
        },
        {
            path: '/login',
            element: <p>login page</p>,
        },
        {
            path: '/search',
            element: <PrivateRoute component={SearchPage} />,
        },
        {
            path: '/items/:itemId',
            element: <PrivateRoute component={ContentSharePage} />,
        },
        {
            path: '/error/*',
            element: <ErrorPage />,
        },
        {
            path: '/my-wiki',
            element: <PrivateRoute component={MyWiki} />,
        },
    ];

    const routesElement = useRoutes(routes);

    return isLoading ? <Loading /> : routesElement;
};

export default AppRoutes;
