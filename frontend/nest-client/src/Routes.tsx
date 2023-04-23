import React, { useContext, useEffect } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { getMyUser } from './services/user';
import { Context } from './Store';
import useWrapFetch from './hooks/useWrapFetch';
import PrivateRoute from './PrivateRouter';
import Example2Page from './pages/Example2/Example2';
import DashboardPage from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/Error/Error';
import Loading from './components/Loading/Loading';
import MyWiki from './pages/MyWiki/MyWiki';

const AppRoutes: React.FC = () => {
    // load the current user
    const [state, dispatch] = useContext(Context);
    const getMyUserWrapped = useWrapFetch(getMyUser)();

    useEffect(() => {
        getMyUserWrapped((user) => dispatch({ type: 'SET_USER', payload: user }));
    }, []);
    const { isLoading } = state;
    // const isLoggedIn = !!state.user;
    const routes: RouteObject[] = [
        {
            path: '/*',
            index: true,
            element: <PrivateRoute component={DashboardPage} />, // TODO: change to the default path to go when no path match eg: Dashboard
        },
        {
            path: '/my-wiki/*',
            element: <PrivateRoute component={MyWiki} />,
        },
        {
            path: '/example2/*',
            element: <PrivateRoute component={Example2Page} />,
        },
        {
            path: '/error/*',
            element: <ErrorPage />,
        },
    ];
    const routesElement = useRoutes(routes);

    if (isLoading) {
        return <Loading />;
    }
    // if (!isLoggedIn && isLoading) {
    //     return <div />;
    // }

    return routesElement;
};

export default AppRoutes;
