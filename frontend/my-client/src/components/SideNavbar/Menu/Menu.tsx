import React, { Dispatch, SetStateAction, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AboutUs from '../AboutUs/AboutUs';
import {
    MainLayout,
    MainHeader,
    Logo,
    MenuBarButtons,
    MenuBarFilter,
    ProfileLine,
    Ellipse,
    Logout,
} from './Menu.style';
import MynetLogo from '../../../assets/images/logos/mynet.svg';

interface IProps {
    drawerOpen: Dispatch<SetStateAction<boolean>>;
}

const MenuPage: React.FC<IProps> = (props: IProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { drawerOpen } = props;
    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonClick = (buttonName: any) => {
        setSelectedButton(buttonName);
    };

    const menuBarButtons = [
        {
            buttonName: t('MENU_BAR.HOME'),
            icon: <HomeRoundedIcon style={{ marginLeft: '15px' }} />,
            onClick: () => navigate('/HomePage'),
        },
        {
            buttonName: t('MENU_BAR.SEARCH'),
            icon: <SearchRoundedIcon style={{ marginLeft: '15px' }} />,
            onClick: () => navigate('/search'),
        },
        {
            buttonName: t('MENU_BAR.MY_WIKI'),
            icon: <SortByAlphaRoundedIcon style={{ marginLeft: '15px' }} />,
            onClick: () => navigate('/my-wiki'),
        },
        {
            buttonName: t('MENU_BAR.BOOKS'),
            icon: <ImportContactsIcon style={{ marginLeft: '15px' }} />,
            onClick: () => navigate('/BooksPage'),
        },
    ];

    const createMenuBarButtons = () => {
        return Object.values(menuBarButtons).map((button) => {
            return (
                <MenuBarButtons key={button.buttonName} value={button.buttonName} onClick={button.onClick}>
                    {button.icon} {button.buttonName}
                </MenuBarButtons>
            );
        });
    };

    return (
        <MainLayout id="MainLayout">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <MainHeader>
                    <Logo src={MynetLogo} alt="mynet-logo" />
                    <KeyboardArrowRightIcon onClick={() => drawerOpen(false)} />
                </MainHeader>
                <MenuBarFilter
                    value={selectedButton}
                    exclusive
                    onChange={(_event, button) => {
                        handleButtonClick(button);
                    }}
                >
                    {createMenuBarButtons()}
                </MenuBarFilter>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ProfileLine>
                    <Ellipse />
                    <AccountCircleRoundedIcon />
                    {t('MENU_PAGE.PROFILE')}
                    <div style={{ marginRight: '49%' }}>
                        <Logout>{t('MENU_PAGE.LOG-OUT')}</Logout>
                    </div>
                </ProfileLine>
                <AboutUs />
            </div>
        </MainLayout>
    );
};

export default MenuPage;
