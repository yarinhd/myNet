import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavigationBar, NavigationMenu, MenuItem, Profile, ProfileIcon, Logo } from './Navbar.style';
import { navigationItems, INavigationItem } from '../../models/NavigationItems';
import NestLogo from '../../assets/NestLogo.svg';
import { Context } from '../../Store';

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const [state] = useContext(Context);
    const location = useLocation();
    const path = location.pathname;

    const loadNavigation = () => {
        return navigationItems.map((item: INavigationItem) => {
            return (
                <MenuItem className={path === item.route ? 'selected' : ''} key={item.title} to={item.route}>
                    {t(`NAVIGATION_ITEMS.${item.title}`)}
                </MenuItem>
            );
        });
    };

    return (
        <NavigationBar position="relative">
            <Logo src={NestLogo} alt="nest-logo" />
            <NavigationMenu>{loadNavigation()}</NavigationMenu>
            <Profile container>
                <ProfileIcon />
                <p>{state.user?.fullName}</p>
            </Profile>
        </NavigationBar>
    );
};

export default Navbar;
