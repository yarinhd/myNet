import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Context } from './Store';

interface PrivateRouteProps {
    component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const [state] = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    // validate login status:
    const isLoggedIn = !!state.user;
    const canEnterApp = state.user; // TODO: check if user is valid(has unit, phone...etc) to enter app

    if (state.error || !isLoggedIn) {
        navigate({ pathname: '/error' }, { state: { from: location.pathname } });
    }
    if (!canEnterApp) {
        navigate({ pathname: '/login' }, { state: { from: location.pathname } });
    }
    // else he can login to the page, show the component
    return (
        // <MainLayout> // if you have a wrapper layout for the whole app
        <Component />
        // </MainLayout> // if you have a wrapper layout for the whole app
    );
};

export default PrivateRoute;
