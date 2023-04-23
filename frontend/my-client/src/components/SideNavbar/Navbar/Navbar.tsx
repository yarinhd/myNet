import React, { useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { NavigationBar } from './Navbar.style';
import Menu from '../Menu/Menu';

interface IProps {
    iconColor: string;
}

const Navbar: React.FC<IProps> = ({ iconColor }) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <NavigationBar>
            <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                }}
                onOpen={() => {
                    setDrawerOpen(true);
                }}
            >
                <Menu drawerOpen={setDrawerOpen} />
            </SwipeableDrawer>
            <MenuRoundedIcon onClick={() => setDrawerOpen(true)} sx={{ color: iconColor, fontSize: '1.8rem' }} />
        </NavigationBar>
    );
};

export default Navbar;
