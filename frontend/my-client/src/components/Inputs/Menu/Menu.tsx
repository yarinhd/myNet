import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationMenu, MenuItem } from './Menu.style';
import { INavigationItem } from '../../../models/NavigationItems';

interface IProps<T> {
    menuItems: INavigationItem[];
    selected: {
        value: T;
        set: (value: T) => void;
    };
    color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Menu = <T extends any>({ menuItems, selected, color }: IProps<T>) => {
    const { t } = useTranslation();

    const handleSelect = (event: any, value: T) => {
        selected.set(value);
    };

    const loadNavigation = () => {
        return menuItems.map((item: INavigationItem) => {
            return <MenuItem key={item.value} value={item.value} label={t(item.title)} itemColor={item.color} />;
        });
    };

    return (
        <NavigationMenu value={selected.value} onChange={handleSelect} variant="fullWidth" itemColor={color}>
            {loadNavigation()}
        </NavigationMenu>
    );
};

Menu.defaultProps = {
    color: undefined,
};

export default Menu;
